import React, { useEffect, useState } from 'react'
import Course from '../common/Course'
import Layout from '../common/Layout'
import { apiUrl } from '../common/Config';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from '../common/Loading';
import NotFound from '../common/NotFound';

const Courses = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rating, setRating] = useState(4.0);
    const [categories, setCategories] = useState([]);
    const [levels, setLevels] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [courses, setCourses] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState('desc');
    const [loading, setLoading] = useState([]);

    //handle category checkbox search
    const [categoryChecked, setcategoryChecked] = useState(() => {
        const category = searchParams.get('category');
        return category ? category.split(',') : []
    });

    const handlecategory = (e) => {
        const {checked, value}  = e.target;
        if(checked){
            setcategoryChecked(prev => [...prev, value])
        }else{
            setcategoryChecked(categoryChecked.filter(id => id != value))
        }
    }
 
    //handle level checkbox search
     const [levelChecked, setLevelChecked] = useState(() => {
        const level = searchParams.get('level');
        return level ? level.split(',') : []
    });

     const handleLevel = (e) => {
        const {checked, value}  = e.target;
        if(checked){
            setLevelChecked(prev => [...prev, value])
        }else{
            setLevelChecked(levelChecked.filter(id => id != value))
        }
    }

    //handle language checkbox search
    const [languageChecked, setLanguageChecked] = useState(() => {
        const language = searchParams.get('language');
        return language ? language.split(',') : []
    });

     const handleLanguage = (e) => {
        const {checked, value}  = e.target;
        if(checked){
            setLanguageChecked(prev => [...prev, value])
        }else{
            setLanguageChecked(levelChecked.filter(id => id != value))
        }
    }

    const fetchCourses = () => {
        setLoading(true);
      let search = [];
      let params = '';

      //categortyfilter
      if(categoryChecked.length > 0){
        search.push(['category',categoryChecked]);
      }

      //level filter
      if(levelChecked.length > 0){
        search.push(['level',levelChecked]);
      }

     // Language filter
      if(languageChecked.length > 0){
        search.push(['language',languageChecked]);
      }
 
      //keyword filter
      if(keyword.length > 0){
         search.push(['keyword',keyword]);
      }
       
      //sort Order filter default desc
        search.push(['sort',sort]);

      if(search.length > 0){
        params = new URLSearchParams(search);
        setSearchParams(params);
      }else{
         setSearchParams([]);;
      }

        fetch(`${apiUrl}/fetch-courses?${params}`,{
            method: "GET",
            headers: {
             'Content-type':  'application/json',
             'Accept':  'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
          setLoading(false);
           if(result.status === 200){
             setCourses(result.data);
           }else{
             console.log('something went wrong');
           }
        });
    }

    const fetchLevels = () => {
        fetch(`${apiUrl}/fetch-levels`,{
            method: "GET",
            headers: {
             'Content-type':  'application/json',
             'Accept':  'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
           if(result.status === 200){
             setLevels(result.data);
           }else{
             console.log('something went wrong');
           }
        });
    }

    const fetchLanguages = () => {
        fetch(`${apiUrl}/fetch-languages`,{
            method: "GET",
            headers: {
             'Content-type':  'application/json',
             'Accept':  'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
           if(result.status === 200){
             setLanguages(result.data);
           }else{
             console.log('something went wrong');
           }
        });
    }

    const fetchCategories = () => {
        fetch(`${apiUrl}/fetch-categories`,{
            method: "GET",
            headers: {
             'Content-type':  'application/json',
             'Accept':  'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
           if(result.status === 200){
             setCategories(result.data);
           }else{
             console.log('something went wrong');
           }
        });
    }

    const clearFilters = () =>  {
        setcategoryChecked([])
        setLevelChecked([])
        setLanguageChecked([])
        setKeyword('')

        document.querySelectorAll('.form-check-input').forEach(element => element.checked = false)
    }

    useEffect(() => {
        fetchCourses()
       fetchCategories()
       fetchLevels()
       fetchLanguages()
    },[categoryChecked, levelChecked, languageChecked, keyword, sort])

return (
<Layout>
    <div className='container pb-5 pt-3'>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Courses</li>
            </ol>
        </nav>
        <div className='row'>
            <div className='col-lg-3'>
                <div className='sidebar mb-5 card border-0'>
                    <div className='card-body shadow'>
                        <div className="mb-3 input-group">
                            <input 
                             value={keyword}
                             onChange={(e) => setKeyword(e.target.value)}
                            type="text" className='form-control' placeholder='Search by keyword'/>
                        <button className='btn btn-sm btn-success'>
                           Search
                        </button>
                        </div>
                       

                        <div className='pt-3'>
                            <h3 className='h5 mb-2'>Category</h3>
                            <ul>
                                {
                                    categories && categories.map(category => {
                                     return (
                                   <li key={category.id}>
                                     <div className="form-check">
                                        <input 
                                        defaultChecked={searchParams.get('category') ? searchParams.get('category').includes(category.id) : false}
                                        className="form-check-input" type="checkbox" value={category.id} 
                                         onClick={(e) => handlecategory(e)}
                                        id={`category-${category.id}`}/>
                                        <label className="form-check-label" 
                                        htmlFor={`category-${category.id}`}>
                                            {category.name}
                                        </label>
                                    </div>
                                 </li>
                                        )
                                    })
                                }
                                
                            </ul>
                        </div>
                        <div className='mb-3'>
                            <h3 className='h5  mb-2'>Level</h3>
                            <ul>
                                {
                                    levels && levels.map(level => {
                                        return (
                                         <li key={level.id}>
                                          <div className="form-check">
                                        <input 
                                        defaultChecked={searchParams.get('level') ? searchParams.get('level').includes(level.id) : false}
                                        className="form-check-input" type="checkbox" 
                                        value={level.id} 
                                        onClick={(e) => handleLevel(e)}
                                        id={`level-${level.id}`}/>
                                        <label className="form-check-label" 
                                        htmlFor={`level-${level.id}`}>
                                        {level.name}
                                        </label>
                                    </div>
                                </li>
                                        )
                                    })
                                }
                                
                                                                       
                            </ul>
                        </div>
                        <div className='mb-3'>
                            <h3 className='h5 mb-2'>Language</h3>
                            <ul>
                                {
                                    languages && languages.map(language => {
                                        return(
                                         <li key={language.id}>
                                    <div className="form-check">
                                        <input 
                                         defaultChecked={searchParams.get('language') ? searchParams.get('language').includes(language.id) : false}
                                        className="form-check-input" type="checkbox" 
                                        onClick={(e) => handleLanguage(e)}
                                        value={language.id} 
                                        id={`language-${language.id}`}/>
                                        <label className="form-check-label" 
                                        htmlFor={`language-${language.id}`}>
                                        {language.name}
                                        </label>
                                    </div>
                                </li>
                                        )
                                    })
                                }
                                
                                                                        
                            </ul>
                        </div>
                        <Link onClick={() => clearFilters()} className='clear-filter'>Clear All Filters</Link>
                    </div>
                </div>
            </div>
            <div className='col-lg-9'>
                <section className='section-3'>
                    <div className='d-flex justify-content-between mb-3 align-items-center'>
                        <div  className='h5 mb-0'>
                            {/* 10 courses found */}
                        </div>    
                        <div>
                            <select 
                             value={sort}
                             onChange={(e) => setSort(e.target.value)}
                              name="" id="" className='form-select'>
                                <option value="desc">Newset First</option>
                                <option value="asc">Oldest First</option>
                            </select>
                        </div>
                    </div> 
                    <div className="row gy-4">
                     {
                     loading == false && courses.length == 0 && <NotFound/>
                     }

                      {
                       loading == true && <Loading/>
                      }  
                            {
                               loading == false && courses && courses.map(course => {
                                    return (
                                       <Course 
                                        key={course.id}
                                        course={course}
                                        customClasses="col-lg-4 col-md-6"
                                     />
                                    )
                                })
                            }                  
                        
                    </div>
                </section>
            </div>
        </div>
    </div>
</Layout>

  )
}

export default Courses
