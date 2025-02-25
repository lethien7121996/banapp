<?php

namespace App\Http\Controllers;
use App\Chiphi;
use App\Thanhtoankhachhang;
use App\Tientichluy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ChiPhiController extends Controller
{
    public function index($id)
    {
        $chiphi = Chiphi::join('dieutri', 'chiphi.ten', '=', 'dieutri.id')->select("chiphi.*","dieutri.ten as tendieutri")->where("idkhammoi",'=',$id)->orderBy('chiphi.created_at', 'DESC')->get();
        return $chiphi->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ngaytao' => 'required',
            'ten' => 'required',
            'gia' => 'required',
            'soluong' => 'required',
            'thanhtien' => 'required',
            'giamgia' => 'required',
            'tientichluydung' => 'required',
            'saugiam' => 'required',
            'idkhachhang' => 'required',
            'idkhammoi' => 'required'
          ]);
  
          $chiphi = Chiphi::create([
            'ngaytao' => $validatedData['ngaytao'],
            'ten' => $validatedData['ten'],
            'gia' => $validatedData['gia'],
            'soluong' => $validatedData['soluong'],
            'thanhtien' => $validatedData['thanhtien'],
            'giamgia' => $validatedData['giamgia'],
            'tientichluydung' => $validatedData['tientichluydung'],
            'saugiam' => $validatedData['saugiam'],
            'idkhachhang' => $validatedData['idkhachhang'],
            'idkhammoi' => $validatedData['idkhammoi']  
          ]);
          $tientichluykhdv = Tientichluy::where('idkhachhang',$validatedData['idkhachhang'])->first();
          $trutientichluy=$tientichluykhdv->tientichluy-$validatedData['tientichluydung'];
            Tientichluy::where('idkhachhang', $validatedData['idkhachhang'])
            ->update([
                'tientichluy' => $trutientichluy
             ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $chiphi = Chiphi::find($id);
        $chiphi->ngaytao = $request->get('ngaytao');
        $chiphi->ten = $request->get('ten');
        $chiphi->gia = $request->get('gia');
        $chiphi->soluong = $request->get('soluong');
        $chiphi->thanhtien = $request->get('thanhtien');
        $chiphi->giamgia = $request->get('giamgia');
        $chiphi->tientichluydung = $request->get('tientichluydung');
        $chiphi->saugiam = $request->get('saugiam');
        $chiphi->idkhachhang = $request->get('idkhachhang');
        $chiphi->idkhammoi = $request->get('idkhammoi');
        $chiphi->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {

      $chiphi = Chiphi::find($id);
      $tientichluykhdv = Tientichluy::where('idkhachhang',$chiphi->idkhachhang)->first();
          $trutientichluy=$tientichluykhdv->tientichluy+$chiphi->giamgia;
            Tientichluy::where('idkhachhang', $chiphi->idkhachhang)
            ->update([
                'tientichluy' => $trutientichluy
             ]);
      $chiphi->delete();

      return response()->json('Successfully Deleted');
    }
    public function chitietchiphi($id)
    {
      $chiphi = Chiphi::where('id',$id)->first();

      return $chiphi->toJson();
    }
    public function sumchiphi($id)
    {
        $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$id)->get();
        return $chiphi->toJson();
    }
    public function sumchiphitheokhachhang($id)
    {
        $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhachhang",'=',$id)->get();
        return $chiphi->toJson();
    }
    public function tienconnokhachhang($id)
    {
        $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhachhang",'=',$id)->get();
        $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhachhang",'=',$id)->get();
        $tienno = $chiphi[0]["tongsaugiam"] - $dathanhtoan[0]["dathanhtoan"];
        return $tienno;
    }
    public function doanhthutienno()
    {
        $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->get();
        $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->get();
        $tienno = $chiphi[0]["tongsaugiam"] - $dathanhtoan[0]["dathanhtoan"];
        return $tienno;
    }
    public function doanhthutong()
    {
        $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->get();
       
        $doanhthu = $chiphi[0]["tongsaugiam"];
        return $doanhthu;
    }
    public function doanthuthucnhan()
    {
      $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->get();
       
        $doanhthu = $dathanhtoan[0]["dathanhtoan"];
        return $doanhthu;
    }
    // theo tháng
    public function doanhthutiennotheothang($id)
    {
        $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->whereMonth('created_at', '=', $id)->get();
        $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->whereMonth('created_at', '=', $id)->get();
        $tienno = $chiphi[0]["tongsaugiam"] - $dathanhtoan[0]["dathanhtoan"];
        return $tienno;
    }
    public function doanhthutongtheothang($id)
    {
        $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->whereMonth('created_at', '=', $id)->get();
       
        $doanhthu = $chiphi[0]["tongsaugiam"];
        return $doanhthu;
    }
    public function doanthuthucnhantheothang($id)
    {
      $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->whereMonth('created_at', '=', $id)->get();
       
        $doanhthu = $dathanhtoan[0]["dathanhtoan"];
        return $doanhthu;
    }
}
