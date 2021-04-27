<?php

namespace App\Http\Controllers;
use App\Thanhtoandaxoa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ThanhToanDaXoaController extends Controller
{
    public function index($id)
    {
        $thanhtoan = Thanhtoandaxoa::where("idkhammoi",'=',$id)->get();
        return $thanhtoan->toJson();
    }
}
