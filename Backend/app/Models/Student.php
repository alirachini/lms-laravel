<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'fname',
        'lname',
        'email',
        'phone',
        'dob',
        'picture',
        'isActive',
    ];

    public function section()
    {
        return $this->belongsTo(Classes::class);
    }

    public function attendance_student()
    {
        return $this->hasMany(Attendance_student::class);
    }
}
