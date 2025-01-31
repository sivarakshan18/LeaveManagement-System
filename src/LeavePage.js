import React from 'react';
import LeaveList from './LeaveList';
import LeaveStatus from './LeaveStatus';

const LeavePage = () => {
    return (
        <div>
            <LeaveList />
            <LeaveStatus leaveId="exampleLeaveId" />
        </div>
    );
};

export default LeavePage;
