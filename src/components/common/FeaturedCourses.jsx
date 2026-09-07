import Course from "./Course"


const FeaturedCourses = () => {
    return (
        <section className='section-3 my-5'>    
            <div className="container">
                <div className='section-title py-3  mt-4'>
                    <h2 className='h3'>Featured Courses</h2>
                    <p>Discover courses designed to help you excel in your professional and personal growth.</p>
                </div>
                <div className="row gy-4">
                    <Course 
                        title='The complete 2025 Web Development Bootcamp'
                        level='Advance'
                        enrolled='10'
                        customClasses="col-lg-3 col-md-6"
                    />
                    <Course 
                        title='The complete 2025 Web Development Bootcamp'
                        level='Advance'
                        enrolled='10'
                        customClasses="col-lg-3 col-md-6"
                    />   
                    <Course 
                        title='The complete 2025 Web Development Bootcamp'
                        level='Advance'
                        enrolled='10'
                        customClasses="col-lg-3 col-md-6"
                    />   
                    <Course 
                        title='The complete 2025 Web Development Bootcamp'
                        level='Advance'
                        enrolled='10'
                        customClasses="col-lg-3 col-md-6"
                    />   
                    <Course 
                        title='The complete 2025 Web Development Bootcamp'
                        level='Advance'
                        enrolled='10'
                        customClasses="col-lg-3 col-md-6"
                    />   
                    <Course 
                        title='The complete 2025 Web Development Bootcamp'
                        level='Advance'
                        enrolled='10'
                        customClasses="col-lg-3 col-md-6"
                    />   

                    <Course 
                        title='The complete 2025 Web Development Bootcamp'
                        level='Advance'
                        enrolled='10'
                        customClasses="col-lg-3 col-md-6"
                    />   

                    <Course 
                        title='The complete 2025 Web Development Bootcamp'
                        level='Advance'
                        enrolled='10'
                        customClasses="col-lg-3 col-md-6"
                    />             
                    
                </div>
            </div>
        </section>
    )
}

export default FeaturedCourses
