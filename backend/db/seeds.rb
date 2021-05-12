# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
meet = Meet.create(owner: "Ronny", location: "long island", title: 'the meet to beat all meets', image: "image-url",  date_time: "12:30 tuesday")
meet.comments.build(owner: "Mike", content: "this is a thing")
meet.save

meet2 = Meet.create(owner: "batman", location: "Gotham", title: 'the bat meets', image: "image-url",  date_time: "12:30 tuesday")
meet2.comments.build(owner: "robin", content: "holy crazy cars batman")
meet2.save

meet3 = Meet.create(owner: "Superman", location: "alaska", title: 'krypto meets', image: "image-url",  date_time: "12:30 tuesday")
meet3.comments.build(owner: "superboy", content: "its cold here ")
meet3.save


meet4 = Meet.create(owner: "Flash", location: "Star City", title: 'only super cars ', image: "image-url", date_time: "12:30 tuesday")
meet4.comments.build(owner: "Kid-flash", content: "Im faster then these cars")
meet4.save