Table users {
  id int
  username varchar
  hashed_password varchar
  email varchar
  created_at datetime
  updated_at datetime
} 

Table spots {
  district_id int
  id int
  address varchar
  city varchar
  state varchar
  country varchar
  name varchar
  description varchar
  amenities varchar
  price decimal
  user_id int
  created_at datetime
  updated_at datetime
}

Table bookings {
  id int
  user_id int
  spot_id int
  start_date datetime
  end_date datetime
  created_at datetime
  updated_at datetime
}

Table images {
  id int
  spot_id int
  url varchar
  created_at datetime
  updated_at datetime
}

Table reviews {
  id int
  spot_id int
  user_id int
  body varchar
  rating int
  created_at datetime
  updated_at datetime
}

Table favorites {
  id int
  spot_id int 
  user_id int
}

Table districts {
  id int
  name varchar
}

// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one
// Ref: model.col < model.col

Ref: districts.id < spots.district_id
Ref: users.id < spots.user_id
Ref: users.id < bookings.user_id
Ref: spots.id < bookings.spot_id
Ref: spots.id < images.spot_id
Ref: spots.id < reviews.spot_id
Ref: users.id < reviews.user_id
Ref: users.id < favorites.user_id
Ref: spots.id < favorites.spot_id
