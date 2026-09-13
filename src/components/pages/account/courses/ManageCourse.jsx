import React from 'react';
import Layout from '../../../common/Layout';
import ManageCourseMetaList from './ManageCourseMetaList';
import UserSidebar from '../../../common/UserSidebar';


const ManageCourse = () => {
  return (
    <Layout>
      <section className="section-4">
        <div className="container pb-5 pt-3">
          <div className="row">
            <div className="col-lg-3 account-sidebar">
              <UserSidebar />
            </div>
            <div className="col-lg-9">
              {/* Outcomes Section */}
              <ManageCourseMetaList
                endpoint="outcomes"
                title="Course Outcomes"
                placeholder="What will students learn from this course?"
              />

              {/* Requirements Section */}
              <ManageCourseMetaList
                endpoint="requirements"
                title="Course Requirements"
                placeholder="What skills or tools are required before starting?"
              />

              {/* Prerequisites / Intended Audience (Optional) */}
              <ManageCourseMetaList
                endpoint="prerequisites"
                title="Target Audience"
                placeholder="Who is this course for?"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ManageCourse;