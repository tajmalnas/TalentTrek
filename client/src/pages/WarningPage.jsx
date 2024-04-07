import React, { useState } from 'react'

const WarningPage = () => {
    const classroomId = location.pathname.split("/")[2];
    const [classId, setClassId] = useState("");

  return (
    <div className='w-full min-h-screen'>
        <div className="">
            You have been debarred from the test doe to suspecious activities.
            kindly head back to <Link to={`/classroom/${classId}`}>Link</Link>
        </div>
      
    </div>
  )
}

export default WarningPage
