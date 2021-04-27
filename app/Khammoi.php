<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Khammoi extends Model
{
    protected $table = 'khammoi';
    protected $fillable = ['ngay','nguon','benhly','dichvu','ghichu','bacsi','chiphi','thanhtoan','trangthaidieutri','idkhachhang'];
    public function khachhang()
	{
		return $this->belongsTo('App\Khachhang','idkhachhang');
	}
}
