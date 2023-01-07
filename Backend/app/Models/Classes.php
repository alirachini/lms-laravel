<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class  Classes extends Model
{
    public $timestamps = false;
    protected $fillable = ['ClassName'];
    use HasFactory;

    public function sections()
    {
        return $this->hasMany(Section::class, "class_id");
    }

}
