<?php

namespace App\Http\Controllers;
use App\Khammoi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KhamMoiController extends Controller
{
    public function index($id)
    {
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->join('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->where("idkhachhang",'=',$id)->orderBy('khammoi.created_at', 'DESC')->get();
        return $khammoi->toJson();
    }
    public function getallkhammoi()
    {
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->join('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->orderBy('khammoi.created_at', 'DESC')->get();
        return $khammoi->toJson();
    }
    public function getallkhammoitheobacsi($id)
    {
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->join('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->where('khammoi.bacsi',$id)->orderBy('khammoi.created_at', 'DESC')->get();
        return $khammoi->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ngay' => 'required',
            'nguon' => 'required',
            'benhly' => 'required',
            'dichvu' => 'required',
            'ghichu' => 'required',
            'bacsi' => 'required',
            'chiphi' => 'required',
            'thanhtoan' => 'required',
            'trangthaidieutri' => 'required',
            'idkhachhang' => 'required'
          ]);
  
          $khammoi = Khammoi::create([
            'ngay' => $validatedData['ngay'],
            'nguon' => $validatedData['nguon'],
            'benhly' => $validatedData['benhly'],
            'dichvu' => $validatedData['dichvu'],
            'ghichu' => $validatedData['ghichu'],
            'bacsi' => $validatedData['bacsi'],
            'chiphi' => $validatedData['chiphi'],
            'thanhtoan' => $validatedData['thanhtoan'],
            'trangthaidieutri' => $validatedData['trangthaidieutri'],
            'idkhachhang' => $validatedData['idkhachhang']
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $khammoi = Khammoi::find($id);
        $khammoi->ngay = $request->get('ngay');
        $khammoi->nguon = $request->get('nguon');
        $khammoi->benhly = $request->get('benhly');
        $khammoi->dichvu = $request->get('dichvu');
        $khammoi->ghichu = $request->get('ghichu');
        $khammoi->bacsi = $request->get('bacsi');
        $khammoi->chiphi = $request->get('chiphi');
        $khammoi->thanhtoan = $request->get('thanhtoan');
        $khammoi->trangthaidieutri = $request->get('trangthaidieutri');
        $khammoi->idkhachhang = $request->get('idkhachhang');
        $khammoi->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $khammoi = Khammoi::find($id);
      $khammoi->delete();

      return response()->json('Successfully Deleted');
    }
    public function chitietkhammoi($id)
    {
      $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->join('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->where('khammoi.id',$id)->first();

      return $khammoi->toJson();
    }
    public function chitietkhammoikhachhang($id)
    {
      $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->join('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->where('khammoi.idkhachhang',$id)->latest('created_at')->first();

      return $khammoi->toJson();
    }
    public function laysoanh($id)
    {
      $khammoi = DB::table('anhlichhen')->select( DB::raw(' count(idkhammoi) as soanh'))->where("idkhammoi",'=',$id)->get();
      return $khammoi->toJson();
    }
    
}
