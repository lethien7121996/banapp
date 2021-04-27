
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import Select from "react-select";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
class LichHenTong extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: [],
      khachhanglist: [],
      listkhachhang: [],
      doctorlist: [],
      dichvulist: [],
      benhlylist: [],
      idlichlamviec:'',
      dieutridichvulist: [],
      idkhachhang: '2',
      lichkhachhang: [],
      dichvu: '',
      trangthai: '1',
      loai: '1',
      dieutri: '1',
      benhly: '1', 
      ghichu: 'chưa có ghi chú',
      start: '',
      end: '',
      idbacsi: '1',
      idkhachhangs:'',
      idkhammoi: '1',
      idupdatellv: '',
      khachhangselect: { label: "Chọn khách hàng cần tìm", value: "" },
      chuoicantim: '',
      tenbacsi: ''
    }
  
    this.onEventDrop=this.onEventDrop.bind(this)
    this.handleSelect=this.handleSelect.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewLichLamViec  = this.handleCreateNewLichLamViec.bind(this)
    this.handleUpdateLichLamViec  = this.handleUpdateLichLamViec.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleFieldChangeKhachHang = this.handleFieldChangeKhachHang.bind(this)
    this.handlexemchitiet = this.handlexemchitiet.bind(this)
    this.handleBoLocLichHen = this.handleBoLocLichHen.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  componentWillMount(){
    const scripts = [
      '/public/app_assets/js/jasny-bootstrap.js',
      '/public/app_assets/js/mask.js',
      '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      '/public/app_assets/js/custome-app.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/bootstrap/dist/js/bootstrap.min.js',
      './public/app_assets/js/bootstrap-select.min.js',
      '/public/app_assets/js/datatable/custom.js'
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
componentDidMount(){
  const scripts = [
    '/public/app_assets/js/jasny-bootstrap.js',
      '/public/app_assets/js/mask.js',
      '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      '/public/app_assets/js/custome-app.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/bootstrap/dist/js/bootstrap.min.js',
      './public/app_assets/js/bootstrap-select.min.js',
      '/public/app_assets/js/datatable/custom.js'
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

if(localStorage.getItem('userrole')==="3")
{
    axios.get('/index.php/api/laytenkhtheobacsi/'+localStorage.getItem('userkhid')).then(response => {
        var khachhangjson = []
        khachhangjson.push({ 
            "value" : "",
            "label"  : "Chọn khách hàng cần tìm",
        });
        response.data.forEach(cd => {
         
      
            khachhangjson.push({ 
              "value" : cd.tenkhachhang,
              "label"  : cd.tenkhachhang,
          });
        })
        this.setState({
            khachhanglist: khachhangjson
        })
        console.log(khachhangjson)
     
      })
}
else
{
    axios.get('/index.php/api/customers').then(response => {
        var khachhangjson = []
        response.data.forEach(cd => {
         
      
            khachhangjson.push({ 
              "value" : cd.hoten,
              "label"  : cd.hoten,
          });
        })
        this.setState({
            khachhanglist: khachhangjson
        })
        console.log(khachhangjson)
     
      })
}
 
  axios.get('/index.php/api/doctor').then(response => {
    this.setState({
      doctorlist: response.data
    })
  })  
  axios.get('/index.php/api/dichvu').then(response => {
    this.setState({
      dichvulist: response.data
    })
  }) 
  axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
    console.log(response.data)
    this.setState({
      usercurrent: response.data
    })
    if(response.data["role"]==3)
    {
      axios.get('/index.php/api/lichhentheobacsi/'+response.data["idkh"]).then(response => {
 
        this.setState({
          lichkhachhang: response.data
        })
      })
    }
    else
    {
      axios.get('/index.php/api/lichlamviec/').then(response => {
        this.setState({
          lichkhachhang: response.data
        })
        console.log(this.state.lichkhachhang)
      })
    }
  })
  

  
  axios.get('/index.php/api/chandoan').then(response => {
        
    this.setState({
        benhlylist: response.data
      })
  })
  axios.get('/index.php/api/dichvusanpham').then(response => {
      
    this.setState({
        dieutridichvulist: response.data
    })
  })
}

  onEventDrop(data){
  
    const { start, end , event } = data
    
 
    const { history } = this.props
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })
      const sukiens = {
      idkhachhang: event["idkhachhang"],
      dichvu: event["dichvu"],
      trangthai: event["trangthai"],
      ghichu: event["ghichu"],
      start: start,
      end : end,
      idbacsi: event["idbacsi"]
    }
    console.log(events);
    axios.post('/index.php/api/lichlamviecupdate/'+event["idlichlamviec"],sukiens)
     .then(response => {
       // redirect to the homepage
     
         var arr=[]

         axios.get('/index.php/api/lichlamviec').then(response => {
           response.data.map(ev => {
             arr.push({
               idlichlamviec: ev.id,
               title: ev.ghichu,
               ghichu: ev.ghichu,
               dichvu: ev.dichvu,
               idkhachhang: ev.idkhachhang,
               idbacsi: ev.idbacsi,
               trangthai: ev.trangthai,
               start: moment(ev.start).toDate(),
               end: moment(ev.end).toDate()
             })
             this.setState({
              events: arr
            })
              })
           })
          
        
       
    
       var button = document.getElementById('btn-end')
       button.click()
      
     })
     .catch(error => {
        alert("Điền đầy đủ thông tin")
       var button = document.getElementById('btn-end')
       button.click()
     })
    
  }
  handleSelect({ start, end }){
    
    console.log(start)
    this.setState({

          start: start,
          end:  end,
    })
    document.getElementById("btnthemlich").click()
  }
  handleFieldChange (event) {
   


    this.setState({
      [event.target.name]: event.target.value
    })
    
   }
   handleFieldChangeKhachHang (value) {
   

console.log(value.value)
    this.setState({ khachhangselect: value,
    idkhachhang: value.value,
    chuoicantim: value.value
    })
    
    
   }
   handleCreateNewLichLamViec (event) {
     event.preventDefault()
 
     const { history } = this.props
 
     const lichlamviec = {
        idkhachhang : this.state.idkhachhang,
        dichvu : this.state.dichvu,
        trangthai: this.state.trangthai,
        ghichu : this.state.ghichu,
        loai: this.state.loai,
        dieutri: this.state.dieutri,
        benhly: this.state.benhly,
        idkhammoi: this.state.idkhammoi,
        start :  new Date(document.getElementById("start").value),
        end :  new Date(document.getElementById("start").value),
        idbacsi : this.state.idbacsi
 
     }
     console.log(lichlamviec)
     axios.post('/index.php/api/lichlamviec', lichlamviec)
      .then(response => {
    
          

          axios.get('/index.php/api/lichlamviec/').then(response => {
                this.setState({
                  lichkhachhang: response.data
                })
            })
           
         
       
          
        var button = document.getElementById('btn-end')
       
        button.click()
  
      })
      .catch(error => {
      alert("Điền đầy đủ thông tin")
      
        
      })
   }
   handlexemchitiet(event){
     event.preventDefault()
     let idpc=event.target.attributes.getNamedItem('data-idlichlamviec').value
  
     axios.get('/index.php/api/lichlamviecchitiet/'+idpc)
      .then(response => {
        axios.get('/index.php/api/chitietkhachhang/'+response.data["idkhachhang"])
        .then(response => {
          this.setState({
              khachhangselect: {value: response.data["ID"], label: response.data["hoten"]}
          })
        })
        document.getElementById("updateidbacsi").value=response.data["idbacsi"]
        document.getElementById("updatedichvu").value=response.data["dichvu"]
        document.getElementById("updateghichu").value=response.data["ghichu"]
        document.getElementById("updatetrangthai").value=response.data["trangthai"]
        document.getElementById("updateloai").value=response.data["loai"]
        document.getElementById("updatebenhly").value=response.data["benhly"]
        document.getElementById("updatedieutri").value=response.data["dieutri"]
        document.getElementById("idupdatellv").value=response.data["id"]
        document.getElementById("updatestart").value=new Date(response.data["start"])
      
      
       
        var selectidbacsi=document.getElementById("updateidbacsi").childNodes;
  
    for(var i = 0; i < selectidbacsi.length; i++) {
     var datagt=selectidbacsi[i].value;
     if(datagt==response.data["idbacsi"])
     {
      selectidbacsi[i].setAttribute('selected', true);
     }
    }
    
    var selectiddv=document.getElementById("updatedichvu").childNodes;
    
    for(var j = 0; j < selectiddv.length; j++) {
     var datadv=selectiddv[j].value;
     if(datadv==response.data["dichvu"])
     {
      selectiddv[j].setAttribute('selected', true);
     }
    }
    var selectbenhly=document.getElementById("updatebenhly").childNodes;
  
    for(var m = 0; m < selectbenhly.length; m++) {
     var datatt=selectbenhly[m].value;
     if(datatt==response.data["benhly"])
     {
        selectbenhly[m].setAttribute('selected', true);
     }
    }
    var selectdieutri=document.getElementById("updatedieutri").childNodes;
  
    for(var m = 0; m < selectdieutri.length; m++) {
     var datatt=selectdieutri[m].value;
     if(datatt==response.data["dieutri"])
     {
      selectdieutri[m].setAttribute('selected', true);
     }
    }
    var selectidtt=document.getElementById("updatetrangthai").childNodes;
  
    for(var z = 0; z < selectidtt.length; z++) {
     var datatt=selectidtt[z].value;
     if(datatt==response.data["trangthai"])
     {
      selectidtt[z].setAttribute('selected', true);
     }
    }
    var selectloai=document.getElementById("updateloai").childNodes;
  
    for(var z = 0; z < selectloai.length; z++) {
     var datatt=selectloai[z].value;
     if(datatt==response.data["loai"])
     {
        selectloai[z].setAttribute('selected', true);
     }
    }
    this.setState({
     
      idkhachhang:response.data["idkhachhang"],
      dichvu: response.data["dichvu"],
      trangthai: response.data["trangthai"],
      ghichu:response.data["ghichu"],
      loai:response.data["loai"],
      dieutri:response.data["dieutri"],
      benhly:response.data["benhly"],
      start: response.data["start"],
      end : response.data["end"],
      idbacsi: response.data["idbacsi"],
      idlichlamviec: response.data["idlichlamviec"],
      idupdatellv: response.data["id"]
      
    })
      })
      .catch(error => {
      
        
      })
     
   
    
    
    document.getElementById("btnthemlichs").click()
  }
  handleUpdateLichLamViec(event){

    event.preventDefault()
    const lichlamviecupdate = {
      idkhachhang: this.state.idkhachhang,
      dichvu: document.getElementById("updatedichvu").value,
      trangthai: document.getElementById("updatetrangthai").value,
      ghichu: document.getElementById("updateghichu").value,
      loai: this.state.loai,
      dieutri: this.state.dieutri,
      benhly: document.getElementById("updatebenhly").value,
      idkhammoi: this.state.idkhammoi,
      ghichu: document.getElementById("updateghichu").value,
      start :  new Date(document.getElementById("updatestart").value),
      end :  new Date(document.getElementById("updatestart").value),
      idbacsi: document.getElementById("updateidbacsi").value

     }
     console.log(this.state.khachhangselect);
     axios.post('/index.php/api/lichlamviecupdate/'+document.getElementById("idupdatellv").value,lichlamviecupdate)
     .then(response => {
       

        axios.get('/index.php/api/lichlamviec/').then(response => {
          this.setState({
            lichkhachhang: response.data
          })
          })
         
       
     
        
         var button = document.getElementById('btn-ends')
         button.click()
     })
     .catch(error => {
     
       var button = document.getElementById('btn-ends')
       button.click()
     })
  }
  handleDelete(event){
    event.preventDefault()
     let idpc=event.target.attributes.getNamedItem('data-idlichlamviec').value

    axios.get('/index.php/api/deletelichlamviec/'+idpc)
    .then(response => {
      // redirect to the homepage
    
          // redirect to the homepage
       
       

        axios.get('/index.php/api/lichlamviec/').then(response => {
         this.setState({
           lichkhachhang: response.data
         })
          })
         
       
   
        
         var button = document.getElementById('btn-ends')
         button.click()
         
        
     
    })
    .catch(error => {
   
      
    })
  }
  renderBacSi(idbacsi,idcol) {
    axios.get('/index.php/api/bacsitheoid/'+idbacsi).then(response => {
      document.getElementById("tenbacsi"+idcol).innerText=response.data.ten
    })
    
}
renderDichVuDieuTri(iddichvu,idcol) {
  axios.get('/index.php/api/dichvudetail/'+iddichvu).then(response => {
    document.getElementById("tendichvu"+idcol).innerText=response.data.ten
  })
  
}
handleBoLocLichHen(event)
{
  event.preventDefault()

       
   

  if( document.querySelector("input[name='thoigianhen']").value==="")
  {
    var ngayformat = ""
  }
  else
  {
    var res = document.querySelector("input[name='thoigianhen']").value.split("/");
    var ngayformat = res[2]+"-"+res[1]+"-"+res[0]
  }
  if(ngayformat=="" && document.getElementById("inputkhoangngayhenvalue").value=="" && this.state.chuoicantim=="" && this.state.tenbacsi=="")
  {
      alert("Không có thông tin tìm kiếm");
  }
  else
  {
    const boloc = {

  
      thoigianhen: ngayformat,
      khoangngayhen: document.getElementById("inputkhoangngayhenvalue").value,
      chuoicantim: this.state.chuoicantim,
      tenbacsi: this.state.tenbacsi
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(boloc);
    axios.post('/index.php/api/boloclichhen', boloc, headers)
    .then(response => {
      
        this.setState({
          lichkhachhang: response.data
        })
        document.querySelector("input[name='khoangngayhen']").value=boloc["khoangngayhen"]
        if(boloc["khoangngayhen"]!=="")
        {
          document.getElementById("chonthoigianhenkhoang").checked = true;
          document.getElementById("chonthoigianhen").checked = false;
        }
     
    }).catch(err => console.log(err));
  }
  
}
formatDate(date) {
  var res = date.split(" ");
  var ress = res[0].split("-");

    return ress[2]+"-"+ress[1]+"-"+ress[0];
}
handleReset(event)
{
  document.getElementById("boloclich").reset()
   
   this.setState({
    khachhangselect: { label: "Chọn khách hàng cần tìm", value: "" },
    chuoicantim: ''
  })
  axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
    console.log(response.data)
    this.setState({
      usercurrent: response.data
    })
    if(response.data["role"]==3)
    {
      axios.get('/index.php/api/lichhentheobacsi/'+response.data["idkh"]).then(response => {
 
        this.setState({
          lichkhachhang: response.data
        })
      })
    
    }
    else
    {
      axios.get('/index.php/api/lichlamviec/').then(response => {
        this.setState({
          lichkhachhang: response.data
        })
        console.log(this.state.lichkhachhang)
      })
    }
  })
}
  render() {
     
    const { doctorlist,dichvulist,khachhanglist,idkhachhangs,lichkhachhang,benhlylist,dieutridichvulist,idkhachhang,khachhangselect  } = this.state
  
    return (
      <div className="row App" id="lichbooking">
            <form onSubmit={this.handleBoLocLichHen} id="boloclich" className="row col-md-12 m-b-40">
  <div className="row col-md-12 m-b-40">
  <div className="col-lg-6">
       
              <div className="row">
              <div className="col-lg-3">
              <div className="groupcheck">
              
                <div className="radio checktablist">
                  <input type="radio" name="chonthoigianhen" id="chonthoigianhen" checked/>
                  <label htmlFor="radionguon6">Thời gian hẹn</label>
                </div>
                <div className="radio checktablist">
                  <input type="radio" name="chonthoigianhen" id="chonthoigianhenkhoang" />
                  <label htmlFor="radionguon5">Khoảng ngày</label>
                </div>
              
            
            </div>
              </div>
              <div className="col-lg-9 mgau">
              <div className="input-group" id="inputhenngay">
              <input type="text" className="form-control"  id="mydatepicker" name="thoigianhen" autocomplete="off" placeholder="dd/mm/yyyy" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
              </div>
              <div className="input-group hidden" id="inputkhoangngayhen">
              <input className="form-control input-daterange-datepicker" id="inputkhoangngayhenvalue"  value="" autocomplete="off" type="text" name="khoangngayhen" placeholder="dd/mm/yyyy - dd/mm/yyyy" defaultValue="" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
           
              </div>
              </div>
              </div>
        </div>
        
        <div className={localStorage.getItem('userrole')==="3" ? "col-lg-6" : "col-lg-3"}>
              <div className="row grcfilters">
            
              <div className="col-lg-12">
           
              <Select
                        isClearable
                        name="chuoicantim"
                        id="chuoicantim"
                      
                        onChange={value => this.handleFieldChangeKhachHang(value)}
                        defaultValue={khachhangselect}
                        value={khachhangselect}
                        options={khachhanglist}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
                  
     
                 
         
              </div>
              </div>
              
        </div>
        {localStorage.getItem('userrole')==="3" ? <div className="hidden"></div> :  <div className="col-lg-3">
              <div className="row grcfilters">
            
              <div className="col-lg-12">
              <div className="input-group">
              <input type="text"  id="timtenbacsitheolich" className="form-control" name="tenbacsi" autocomplete="off" placeholder="Tên bác sĩ" onChange={this.handleFieldChange} />
             
              </div>
              </div>
              </div>
              
        </div>}
        
  
  </div>
  <div clasName="row col-md-12">
<div className="col-md-6">
<input type="submit" id="buttimkiem" className="btn btn-primary" value="Tìm kiếm"/>
</div>
<div className="col-md-6">

</div>
  </div>

      </form>
           <div className="col-md-12 col-xs-12 m-b-20">


</div>
      <div className="col-sm-12">
        <div className="white-box">
        <h3 className="box-title">LỊCH HẸN TỔNG <button className="m-l-10 btn btn-primary" onClick={this.handleReset}><i class="fa fa-refresh"></i></button>
  </h3>
        <table className="table table-bordered  color-table primary-table" >
            <thead>
              <tr>
              <th>STT</th>
                <th className="ngayhencol">Ngày hẹn</th>
                <th>Giờ hẹn</th>
                <th>Mã khách hàng</th>
                <th>Tên</th>
                <th>Bệnh lý</th>
                <th>Dịch vụ</th>
                
                <th>Điều trị</th>
                <th>Bác sĩ</th>
                <th>Ghi chú</th>
                <th>Trạng thái</th>
             
              </tr>
            </thead>
          
            <tbody>
            {lichkhachhang.map((cd,i) => ( 
                
              <tr key={cd.id} id={"lichkhachhangitem"+cd.id} data-role={localStorage.getItem('userrole')==="3" ? "bacsi" : "allrole"} class={localStorage.getItem('userkhid')===cd.idbacsi ? "idbacsi"+cd.idbacsi : "hidden"} data-itemcd={cd.id}>
                <td data-icd={cd.id}>{i+1} </td>
                <td data-icd={cd.id}>{this.formatDate(cd.start)}
           
                </td>
                <td>{cd.giohen}</td>
             
                    <td data-icd={cd.id} id={"tenbacsi"+cd.id}>{"ST-"+cd.idkhachhang}</td>
                <td data-icd={cd.id} id={"tenbacsi"+cd.id}>{cd.tenkhachhang}
                <Link className="btn btn-block btn-success" to={"ho-so-khach-hang/"+cd.idkhachhang}>Chi tiết khách hàng</Link>
                </td>
    
                <td data-icd={cd.id}>{cd.tenbenhly}</td>
                <td data-icd={cd.id}>{cd.tendichvu}</td>
                <td data-icd={cd.id}>{cd.tendieutri}</td>
                <td data-icd={cd.id}>{cd.tenbacsi}</td>
                <td data-icd={cd.id} id={"tendichvu"+cd.id}>
                {cd.luuylichhen}
                    </td>
                {(() => {
        if (cd.trangthailichhen==="1") {
          return (
            <td><button className="btn btn-block btn-warning"> Đặt hẹn</button></td>
          )
        }
        else if (cd.trangthailichhen==="2") {
            return (
              <td><button className="btn btn-block btn-danger">Không đến</button></td>
            )
        }
        else if (cd.trangthailichhen==="3") {
            return (
              <td><button className="btn btn-block btn-primary">Đã đến</button></td>
            )
        }
        else {
          return (
            <td><button className="btn btn-block btn-success">Đã làm</button></td>
          )
        }
      })()}
    
               
              </tr>
            ))}
              
            </tbody>
          </table>
        
          <button id="btnthemlich" type="button" className="btn btn-block  btn-primary hidden" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
          <button id="btnthemlichs" type="button" className="btn btn-block  btn-primary hidden" data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
         
          </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Tạo Lịch Hẹn</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewLichLamViec}>
          <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Khách hàng</label>
              <Select
                        
          name="idkhachhang"
          id="idkhachhang"
        
          onChange={value => this.handleFieldChangeKhachHang(value)}
          defaultValue={khachhanglist[0]}
          value={khachhangselect}
          options={khachhanglist}
          className="basic-multi-select"
    classNamePrefix="select"
  
        />
              </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bác sĩ phụ trách</label>
              <select className="form-control" name="idbacsi" id="idbacsi" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bác sĩ</option>
              {doctorlist.map(bs => (
                <option key={bs.id} value={bs.id} data-dv={bs.id}>{bs.ten}</option>
              ))}
    
    
    </select>
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Dịch Vụ</label>
              <select className="form-control" name="dichvu" id="dichvu" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn dịch vụ</option>
              {dichvulist.map(dv => (
                <option key={dv.id} value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bệnh lý</label>
              <select className="form-control" name="benhly" id="benhly" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bệnh lý</option>
              {benhlylist.map(dv => (
                <option key={dv.id} value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
              <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                    <label htmlFor="recipient-name" className="control-label">Tên dịch vụ điều trị</label>
                        <select className="form-control" name="dieutri" id="dieutri" onChange={this.handleFieldChange}>
                            <option value="chưa chọn">Chọn dịch vụ điều trị</option>
                            {dieutridichvulist.map(cd => ( 
                            <option id={"itemdieutridichvu"+cd.id} key={cd.id}  value={cd.id} >{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
            <label htmlFor="recipient-name" className="control-label">Ngày hẹn</label>
                          <input type="text" autocomplete="off" className="form-control mydatepicker" name="start" id="start" onChange={this.handleFieldChange}  /> 
            </div>
          
         
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="ghichu" name="ghichu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Trạng thái</label>
              <select className="form-control" name="trangthai" id="trangthai" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn trạng thái</option>
              <option value={1}>Đặt hẹn</option>
              <option value={2} >Không đến</option>
              <option value={3} >Đã đến</option>
              <option value={4} >Đồng ý</option>
              <option value={5} >Không dồng ý</option>
    </select>
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Loại</label>
              <select className="form-control" name="loai" id="loai" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn loại</option>
              <option value={1} checked>Khám mới</option>
              <option value={2} checked>Tái khám</option>
    </select>
            </div>
            <div className="modal-footer">
          <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel2">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel2">Cập nhật Lịch Hẹn</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateLichLamViec}>
          <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Khách hàng</label>
              <Select
                        
                        name="idkhachhang"
                        id="updateidkhachhang"
                      
                        onChange={value => this.handleFieldChangeKhachHang(value)}
                        defaultValue={khachhangselect}
                        value={khachhangselect}
                        options={khachhanglist}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
              </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bác sĩ phụ trách</label>
              <select className="form-control" name="idbacsi" id="updateidbacsi" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bác sĩ</option>
              {doctorlist.map(bs => (
                <option key={bs.id} value={bs.id} data-dv={bs.id}>{bs.ten}</option>
              ))}
    
    
    </select>
              </div>
              <div className="form-group">
                <div className="row">
                <div className="col-md-6">
            
              <label htmlFor="recipient-name" className="control-label">Dịch vụ</label>
              <select className="form-control" name="dichvu" id="updatedichvu" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn dịch vụ</option>
              {dichvulist.map(dv => (
                <option key={dv.id} value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              
                </div>
                <div className="col-md-6">
              
              <label htmlFor="recipient-name" className="control-label">Bệnh lý</label>
              <select className="form-control" name="benhly" id="updatebenhly" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bệnh lý</option>
              {benhlylist.map(dv => (
                <option key={dv.id} value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
            
                  </div>
                </div>
                </div>
          
          
              <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                    <label htmlFor="recipient-name" className="control-label">Tên dịch vụ điều trị</label>
                        <select className="form-control" name="dieutri" id="updatedieutri" onChange={this.handleFieldChange}>
                            <option value="chưa chọn">Chọn dịch vụ điều trị</option>
                            {dieutridichvulist.map(cd => ( 
                            <option key={cd.id}  value={cd.id} >{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
            <label htmlFor="recipient-name" className="control-label">Ngày hẹn</label>
                          <input type="text" className="form-control mydatepicker" name="start" id="updatestart" onChange={this.handleFieldChange}  /> 
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="updateghichu" name="ghichu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
                <div className="row">
                <div className="col-md-6">
              <label htmlFor="message-text"  className="control-label">Trạng thái</label>
              <select className="form-control" name="trangthai" id="updatetrangthai" onChange={this.handleFieldChange}>
              <option value={0}>Chọn trạng thái</option>
              <option value={1}>Đặt hẹn</option>
              <option value={2} >Không đến</option>
              <option value={3} >Đã đến</option>
              <option value={4} >Đồng ý</option>
              <option value={5} >Không dồng ý</option>
    </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="message-text"  className="control-label">Trạng thái khám</label>
              <select className="form-control" name="loai" id="updateloai" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn loại</option>
              <option value={1} >Khám mới</option>
              <option value={2} >Tái Khám</option>
        
    </select>
            </div>
                </div>
         
            </div>
          
           
            <div className="form-group hidden">
              <label htmlFor="message-text"  className="control-label">ID Lịch Làm Việc</label>
              <input type="text" className="form-control" id="idupdatellv" name="idupdatellv" onChange={this.handleFieldChange} />
            </div>
            <div className="modal-footer">
          <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
         
          <button type="submit" className="btn btn-primary" >Cập nhật</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
          </div>
  
    );
  }
}

export default LichHenTong;