<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance_student extends Model
{
    use HasFactory;

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function attendance_date()
    {
        return $this->belongsTo(Attdate::class, 'attdate_id');
    }
}
