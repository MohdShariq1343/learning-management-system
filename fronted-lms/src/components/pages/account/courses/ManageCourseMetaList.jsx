import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { MdDragIndicator } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { apiUrl, getAuthHeaders } from '../../../common/Config';

const ManageCourseMetaList = ({ endpoint, title, placeholder }) => {
  const { id: courseId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm();

  const fetchItems = async () => {
    try {
      const res = await fetch(`${apiUrl}/${endpoint}?course_id=${courseId}`, {
        headers: getAuthHeaders()
      });
      const result = await res.json();
      if (result.status === 200) {
        setItems(result.data || []);
      }
    } catch (err) {
      toast.error(`Failed to load ${title.toLowerCase()}`);
    }
  };

  useEffect(() => {
    if (courseId) fetchItems();
  }, [endpoint, courseId]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const isEdit = Boolean(editingItem);
      const url = isEdit ? `${apiUrl}/${endpoint}/${editingItem.id}` : `${apiUrl}/${endpoint}`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...data, course_id: courseId })
      });
      const result = await res.json();

      if (result.status === 200) {
        toast.success(result.message || 'Saved successfully');
        reset({ text: '' });
        setEditingItem(null);
        fetchItems();
      } else if (result.errors) {
        Object.keys(result.errors).forEach((field) => {
          setError(field, { message: result.errors[field][0] });
        });
      } else {
        toast.error(result.message || 'Error processing request');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setValue('text', item.text || item.outcome || item.requirement);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    reset({ text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`${apiUrl}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const result = await res.json();

      if (result.status === 200) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.success(result.message || 'Item deleted');
      } else {
        toast.error(result.message || 'Could not delete item');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);

    try {
      await fetch(`${apiUrl}/sort-${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ items: reorderedItems })
      });
      toast.success('Sort order updated');
    } catch (err) {
      toast.error('Failed to save order');
    }
  };

  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="card-header bg-white fw-bold py-3">{title}</div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="mb-3">
            <label className="form-label text-muted small">
              {editingItem ? `Update ${title}` : `Add ${title}`}
            </label>
            <input
              type="text"
              {...register('text', { required: `${title} text is required` })}
              className={`form-control ${errors.text ? 'is-invalid' : ''}`}
              placeholder={placeholder}
            />
            {errors.text && <div className="invalid-feedback">{errors.text.message}</div>}
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm px-3 py-2" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : editingItem ? `Update ${title}` : `Add ${title}`}
            </button>
            {editingItem && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm px-3 py-2"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={`droppable-${endpoint}`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 border rounded bg-light d-flex align-items-center justify-content-between"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <MdDragIndicator className="text-secondary fs-5" />
                          <span className="mb-0">{item.text || item.outcome || item.requirement}</span>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-link text-primary p-0 me-3"
                            onClick={() => handleEdit(item)}
                          >
                            <BsPencilSquare />
                          </button>
                          <button
                            type="button"
                            className="btn btn-link text-danger p-0"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ManageCourseMetaList;