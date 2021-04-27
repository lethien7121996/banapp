import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class SideBarMain extends Component {
  constructor () {
    super()
    this.state = {
      iduser: localStorage.getItem('userid'),
      usercurrent: []
    
  }
  
}
  componentWillMount(){
    
    axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
      console.log(response.data)
      this.setState({
        usercurrent: response.data
      })
    })
  }
  ComponentDidUpdate() {
    const scripts = [
      './public/app_assets/js/datatable/menu.js',
    
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = true
    scripttag.appendChild(script);
  })

 
  }
render(){
  const { iduser,usercurrent } = this.state
  return(
    <div className="navbar-default sidebar" role="navigation">
    <div className="sidebar-nav navbar-collapse slimscrollsidebar">
    {(() => {
            if (usercurrent.role==="1") {
              return (
                <ul className="nav" id="side-menu">
                <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                  {/* input-group */}
                  <div className="input-group custom-search-form">
                    <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                      <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                    </span> </div>
                  {/* /input-group */}
                </li>
                <li className="user-pro">
                <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                  </a>
                
                </li>
                <li className="nav-small-cap m-t-10">--- Menu Chính</li>
              
                <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Khách hàng </span></Link>
             
                </li>
              
                <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                 
                 </li>
                 <li> <Link to='/hoa-hong-bac-si' className="waves-effect"><i className="ti-money p-r-10" /> <span className="hide-menu"> Hoa hồng bác sĩ</span></Link>
                 
                 </li>
                 <li> <a href={void(0)}  className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Doanh thu<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                 <li> <Link to='/tong-quan-theo-thang'>Doanh thu theo tháng</Link> </li>
                        <li> <Link to='/tong-quan'>Doanh thu tổng quan</Link></li>
                           
                          
                          </ul>
                 </li>
                      
                        
                        
                        <li> <a href="#" onClick={e => e.preventDefault()}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">Quảng cáo<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level">
                            
                            <li> <Link to='/quang-cao'>Quảng cáo</Link> </li>
                            <li> <Link to='/bieu-do-quang-cao'>Biểu đồ tổng quan</Link> </li>
                          </ul>
                        </li>
                        <li> <a href="#" onClick={e => e.preventDefault()}  className="waves-effect" aria-expanded="false"><i className="ti-dashboard p-r-10" /> <span className="hide-menu">Thiết lập hệ thống<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level collapse in" aria-expanded="false">
                        <li> <Link to='/thiet-lap-chan-doan'>Thiết lập bệnh lý</Link></li>
                            <li> <Link to='/thiet-lap-dich-vu'>Thiết lập dịch vụ</Link> </li>
                            <li> <Link to='/thiet-lap-dieu-tri'>Thiết lập điều trị</Link> </li>
                          
                           
                            <li> <Link to='/thiet-lap-nguon-gioi-thieu'>Thiết lập giới thiệu</Link></li>
                            <li> <Link to='/thiet-lap-tien-su-benh'>Thiết lập tiền sử bệnh</Link></li>
                            <li> <Link to='/loai-quang-cao'>Loại quảng cáo</Link></li>
                            <li> <Link to='/san-pham-quang-cao'>Sản phẩm quảng cáo</Link> </li>
                            <li> <Link to='/cap-do'>Thiết lập cấp độ</Link></li>
                            <li> <Link to='/tat-ca-bac-si'>Bác sĩ</Link> </li>
                          </ul>
                        </li>
                
              
              </ul>
              )
              }
              else if (usercurrent.role==="3") {
                return (
                  <ul className="nav" id="side-menu">
                  <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                    {/* input-group */}
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                        <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                      </span> </div>
                    {/* /input-group */}
                  </li>
                  <li className="user-pro">
                  <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                    </a>
                  
                  </li>
                  <li className="nav-small-cap m-t-10">--- Menu Chính</li>
                
             
                  <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                   
                   </li>
                  
                   <li> <Link to='/hoa-hong-theo-bac-si' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Báo cáo hoa hồng</span></Link>
                   
                   </li>
                      
                      
                    
                  
                
                </ul>
                )
                }
              else
              {
                return(
                  <ul className="nav" id="side-menu">
                  <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                    {/* input-group */}
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                        <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                      </span> </div>
                    {/* /input-group */}
                  </li>
                  <li className="user-pro">
                  <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                    </a>
                  
                  </li>
                  <li className="nav-small-cap m-t-10">--- Menu Chính</li>
              
                  <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Khách hàng </span></Link>
               
                  </li>
              
                  <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                 
                 </li>
                    
                        
                   
                      
                    
                  
                
                </ul>
                )
              }
          })()}
 
    </div>
  </div>
  )
}
}
       
      
    

    export default SideBarMain