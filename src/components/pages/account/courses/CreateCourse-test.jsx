import React, { useState } from 'react';
import Layout from '../../../common/Layout';
import UserSidebar from '../../../common/UserSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { apiUrl, getAuthHeaders } from '../../../common/Config';

const CreateCourse = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/courses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (result.status === 200) {
        toast.success(result.message || 'Course created successfully');
        navigate(`/account/courses/${result.data.id}`);
      } else if (result.errors) {
        Object.keys(result.errors).forEach((field) => {
          setError(field, { message: result.errors[field][0] });
        });
      } else {
        toast.error(result.message || 'Failed to create course');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-4">
        <div className="container pb-5 pt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/account">Account</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Create Course</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-12 mt-5 mb-3">
              <h2 className="h4 mb-0">Create Course</h2>
            </div>
            <div className="col-lg-3 account-sidebar">
              <UserSidebar />
            </div>
            <div className="col-lg-9">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Course Title</label>
                      <input
                        type="text"
                        {...register('title', { required: 'Title is required.' })}
                        placeholder="Enter Course Title"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      />
                      {errors.title && (
                        <div className="invalid-feedback">{errors.title.message}</div>
                      )}
                    </div>
                    <button className="btn btn-info btn-sm px-3 py-2 text-white" type="submit" disabled={loading}>
                      {loading ? 'Creating...' : 'Continue'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateCourse;