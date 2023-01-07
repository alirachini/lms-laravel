<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ClassesSeeder::class);
        $this->call(SectionsSeeder::class);
        $this->call(AttdateSeeder::class);
        $this->call(StatusSeeder::class);
        $this->call(StudentsSeeder::class);
        // $this->call(AttendanceStudentSeeder::class);
    }
}
