<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Thoigianbieu extends Model
{
    protected $table = 'lichhen';
    protected $fillable = ['idkhachhang', 'dichvu', 'trangthai', 'ghichu', 'loai', 'dieutri', 'benhly', 'idkhammoi','start', 'end', 'giohen', 'idbacsi'];
    public function bolocchuoicantim($query, $value)
    {
     return $query->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
     ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
 ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')
 ->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')->Where("khachhang.hoten", 'LIKE',"%".$value."%")->orderBy('lichhen.start', 'desc')->orderBy('lichhen.giohen', 'desc');
    }
    public function boloctenbacsi($query, $value)
    {
     return $query->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
     ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
 ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')
 ->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')->Where("doctor.ten", 'LIKE',"%".$value."%")->orderBy('lichhen.start', 'desc')->orderBy('lichhen.giohen', 'desc');
    }
    public function bolocngaytao($query, $value)
    {
        $date=date_create($value);
    return $query->where('created_at','LIKE',date_format($date,"Y-m-d")." %")->orderBy('start', 'desc')->orderBy('giohen', 'desc');
    }
    public function bolockhoangngaytao($query, $value)
    {
        $arr=array ();  
        $datestr = str_replace('/', '-',  $value );
        $myArray = explode(' ', $datestr);
        $date1=$myArray[0];
        $date2=$myArray[2];
        $date1=date("Y-m-d", strtotime($date1));  
        $date2=date("Y-m-d", strtotime($date2));  
        return $query->where('created_at', '>', $date1)->where('created_at', '<', $date2);
    }
    public function bolocthoigianhen($query, $value)
    {
      
  
    return $query->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
    ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')
->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')->where('lichhen.start','LIKE',$value."%")->orderBy('lichhen.start', 'desc')->orderBy('lichhen.giohen', 'desc');
    }
    public function bolockhoangngayhen($query, $value)
    {
        $arr=array ();  
        $datestr = str_replace('/', '-',  $value );
        $myArray = explode(' ', $datestr);
        $date1=$myArray[0];
        $date2=$myArray[2];
        $date1=date("Y-m-d", strtotime($date1));  
        $date2=date("Y-m-d", strtotime($date2));  
        return $query->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
        ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
    ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')
    ->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')->where('start', '>', $date1)->where('start', '<', $date2)->orderBy('lichhen.start', 'desc')->orderBy('lichhen.giohen', 'desc');
    }
    public function scopeBoloc($query, $param)
    {
        foreach ($param as $field => $value) {
            $method = 'boloc' . $field;

            if ($value != '') {
                if (method_exists($this, $method)) {
                    $this->{$method}($query, $value);
                } else {
                    if (!empty($this->bolocable) && is_array($this->bolocable)) {
                        if (in_array($field, $this->filterable)) {
                            $query->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
                            ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
                            ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')
                           ->where($this->table . '.' . $field, $value)->orderBy('lichhen.start', 'desc')->orderBy('lichhen.giohen', 'desc');
                        } elseif (key_exists($field, $this->bolocable)) {
                            $query->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
                            ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
                            ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')
                           ->where($this->table . '.' . $field, $value)->orderBy('lichhen.start', 'desc')->orderBy('lichhen.giohen', 'desc');
                        }
                    }
                }
            }
        }
    
        return $query;
    }
}
