import React from 'react'

const Dashboard = () => {
  return (
    // <div className="row">
    //   <div className="col-12 col-md-6 col-xl-4 mb-4">
    //     <div className="card mb-4" style={{ height: '80%' }}>
    //       <div className="card-header">Total user</div>
    //       <div className="card-body">
    //         <canvas id="categoryChart"></canvas>
    //       </div>
    //     </div>
    //   </div>


    //   <div className="col-12 col-md-6 col-xl-4 mb-4">
    //     <div className="card mb-4" style={{ height: '80%' }}>
    //       <div className="card-header">Election</div>
    //       <div className="card-body">
    //         <canvas id="categoryChart"></canvas>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="col-12 col-md-6 col-xl-4 mb-4">
    //     <div className="card mb-4" style={{ height: '80%' }}>
    //       <div className="card-header">Party Election </div>
    //       <div className="card-body">
    //         {/* <canvas id="categoryChart"></canvas> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-md-6 col-xl-4 mb-4">
          <div className="card mb-4" style={{ height: '80%' }}>
            <div className="card-header">Total user</div>
            <div className="card-body">
              <canvas id="totalUserChart"></canvas>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-4 mb-4">
          <div className="card mb-4" style={{ height: '80%' }}>
            <div className="card-header">Election</div>
            <div className="card-body">
              <canvas id="electionChart"></canvas>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-4 mb-4">
          <div className="card mb-4" style={{ height: '80%' }}>
            <div className="card-header">Party Election</div>
            <div className="card-body">
              {/* Content for Party Election */}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard