import React from 'react'
import Card from '../components/DashboardComponents/Card.jsx';
import Goback from '../components/Goback.jsx';

const LoanOptions = () => {
  return (
    <div className="bg-black  ">
        <div className='absolute mt-30 sm:ml-80'>
            <Goback/>
            </div>
      <div className="bg-black min-h-screen flex items-center justify-center gap-5">
        <Card title="Loan" link="/loan" photo="/second/loan.png " description="Apply for a Secure Loan." buttonname="Proceed" />
        <Card title="Loan Status" link="/loanstatus" photo="/second/loanStatus.png " description="Check your loan status." buttonname="Check Status" />
      </div>
    </div>
  );
}


export default LoanOptions