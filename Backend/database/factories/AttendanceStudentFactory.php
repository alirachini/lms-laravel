<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance_student>
 */
class AttendanceStudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'student_id'=> $this->faker->numberBetween(1,10),
            'status_id'=> $this->faker->numberBetween(1,10),
            'attdate_id'=> $this->faker->numberBetween(1,10)
        ];
    }
}
