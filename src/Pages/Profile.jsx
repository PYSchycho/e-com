import React from 'react';
import { Formik, Field, Form} from 'formik';
import Navbar from '../component/Navbar';
import { Link, useNavigate } from 'react-router-dom'; 
const Profile = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    city: '',
    state: '',
    PhoneNumber: '',
  };
  const onSubmit = () => {
    navigate("/")
  };
  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto my-4 p-6 bg-blue-300 rounded-lg shadow-md">
        <div className='flex justify-center'>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">PROFILE
        <img src='https://icons-for-free.com/iff/png/512/home+page+profile+user+icon-1320184025620798710.png' alt='loading' className='size-20'/>
        </h2>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}>
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <Field
                  value="Mehak"
                  name="name"
                  className="mt-1 bg-blue-100 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <Field
                  value="Mohali"
                  name="city"
                  className="mt-1 block w-full p-2 bg-blue-100 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <Field
                  value="Chandigrh"
                  name="state"
                  className="mt-1 block w-full p-2  bg-blue-100 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="blocktext-sm font-medium text-gray-700">Phone Number</label>
                <Field
                  value="08378927846"
                  name="PhoneNumber"
                  className="mt-1 block w-full p-2  bg-blue-100 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-center">
                <button type='submit' className='p-2 bg-violet-300 font-bold rounded-md font-serif border-2 border-white'>Home
                <Link to='/'></Link>
              </button>
              </div>
            </Form>
        </Formik>
      </div>
    </>
  );
};
export default Profile;