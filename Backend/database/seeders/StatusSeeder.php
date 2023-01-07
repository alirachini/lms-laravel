<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses =[
            [
                'status'=>'Present',
            ],
            [
                'status'=>'Late',
            ],
            [
                'status'=>'Absent',
            ],
            [
                'status'=>'N/A'
            ]
            ];
            foreach($statuses as $status){
                Status::create($status);
            }
    }
}
