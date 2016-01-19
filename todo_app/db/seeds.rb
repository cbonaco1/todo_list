# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Todo.destroy_all
todo1 = Todo.create!(title: "Blow up Death Star", body: "Use the force, Luke!", done: false)
todo2 = Todo.create!(title: "Master the Force", body: "Carry Yoda around like a saggy backpack", done: false)
todo3 = Todo.create!(title: "Free Han Solo", body: "Make him stop calling me kid", done: false)
todo4 = Todo.create!(title: "Face time with dad", body: "Well, that could have gone better.", done: false)
