import React, { useState, useRef, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import UserSidebar from './components/UserSidebar';
import JoditEditor from 'jodit-react';

const CreateCourse = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [outcomes, setOutcomes] = useState(['']);
    const [requirements, setRequirements] = useState(['']);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || ''
        }),
        [placeholder]
    );

    const handleOutcomeChange = (index, value) => {
        const updatedOutcomes = [...outcomes];
        updatedOutcomes[index] = value;
        setOutcomes(updatedOutcomes);
    };

    const addOutcome = () => {
        setOutcomes([...outcomes, '']);
    };

    const removeOutcome = (index) => {
        const updatedOutcomes = outcomes.filter((_, i) => i !== index);
        setOutcomes(updatedOutcomes);
    };

    const handleRequirementChange = (index, value) => {
        const updatedRequirements = [...requirements];
        updatedRequirements[index] = value;
        setRequirements(updatedRequirements);
    };

    const addRequirement = () => {
        setRequirements([...requirements, '']);
    };

    const removeRequirement = (index) => {
        const updatedRequirements = requirements.filter((_, i) => i !== index);
        setRequirements(updatedRequirements);
    };

    return (
        <>
            <Header />
            <section className='section-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 mt-5 mb-3'>
                            <div className='d-flex justify-content-between'>
                                <h2 className='h3 mb-0 pb-0'>Create Course</h2>
                                <Link to='/account/my-courses/create' className='btn btn-primary'>Back</Link>
                            </div>
                        </div>
                        <div className='col-lg-3 account-sidebar'>
                            <UserSidebar />
                        </div>
                        <div className='col-lg-9'>
                            <form>
                                <div className='card border-0'>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Title</label>
                                                <input type="text" placeholder='Title' className='form-control' />
                                            </div>
                                            <div>
                                                <button className='btn btn-primary'>Create</button>
                                            </div>
                                        </div>                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
export default CreateCourse;