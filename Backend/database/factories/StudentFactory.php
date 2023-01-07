<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'section_id' => $this->faker->numberBetween(1, 10),
            'fname' => $this->faker->firstName,
            'lname' => $this->faker->lastName,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'dob' => $this->faker->dateTimeBetween('-18 years', '-3 years'),
            'picture' => $this->faker->imageUrl(),
            'isactive' => true,
            'slug' => $this->faker->firstName
        ];
    }
}
