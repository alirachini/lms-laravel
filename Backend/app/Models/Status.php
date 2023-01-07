<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    public function attendance_student()
    {
        return $this->hasMany(Attendance_student::class,'status_id');
    }
}
