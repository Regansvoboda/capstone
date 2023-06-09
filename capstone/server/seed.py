from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import app
from models import db, User, Animal, Research, Order

with app.app_context():

    print('Creating Animals...')

    a1 = Animal(name='Sable', type='Shark',
                species='Great White Shark', date_tag='Sep 13, 2021, 1:41:00AM', start_loc='Ironbound Island, Nova Scotia',
                last_ping='Gulf of Mexico', size='10ft. 6in.', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0VdeyLpQWlTTikqdsJYwPD1LIrWLaSLj5w&usqp=CAU')
    a2 = Animal(name='Blancpain', type='Shark',
                species='Whale Shark', date_tag='Dec 6, 2022, 12:00:00AM', start_loc='Henry Reef, Australia',
                last_ping='Great Barrier Reef', size='19ft. 8in.', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStOX-KxIp3iiw3TpFQt5W9-DL13kVRO6YtIA&usqp=CAU')
    a3 = Animal(name='Neshi', type='Shark',
                species='Tiger Shark', date_tag='Feb 24, 2023, 12:00:00AM', start_loc='Norfolk Island',
                last_ping='Tonga Trench', size='13.12ft', image='https://media.mapotic.com/cdn-cgi/image/metadata=none,width=400,height=266,fit=crop/https://pub-ad18855dcf944b0da6f8fdeda00c61a0.r2.dev/media/image/geo/3413/303706/galeocerdo-cuvier_tigershark-tracker-image_jwxbYn5.jpg')
    a4 = Animal(name='Rose', type='Shark',
                species='Great White Shark', date_tag='Oct 4, 2022, 12:00:00AM', start_loc='Lunenburg, Nova Scotia',
                last_ping='Florida Keys', size='10ft. 5in.', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2hQUgV_0PyUh65GkqfqP55okX_u0ra87efA&usqp=CAU')
    a5 = Animal(name='Caroline', type='Shark',
                species='Hammerhead Shark', date_tag='Jan 20, 2023 12:00:00AM', start_loc='Galapagos Islands, Ecuador',
                last_ping='Guatemala Basin', size='4ft. 41in.', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZEV7JqsvTHmQT21RYVV6TZBxtR3iMlJWXJA&usqp=CAU')
    a6 = Animal(name='Tony', type='Turtle',
                species='Olive Ridley Turtle', date_tag='Sep 4, 2022 12:00:00AM', start_loc='Puntarenas, Costa Rica',
                last_ping='Gulfo de Guayaquil', size='2ft. 12in.', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTE_1ByVhgqGF5-o_27jxCQjb5Ze8yDJke8w&usqp=CAU')
    a7 = Animal(name='Melanie', type='Turtle',
                species='Green Sea Turtle', date_tag='Jun 17, 2022, 12:00:00AM', start_loc='Sanibel Island, FL',
                last_ping='Venice, FL', size='4ft. 1in.', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9uYQkIRYNtGHxSawKZR2MDK-KYFBKstiINQ&usqp=CAU')
    a8 = Animal(name='Lady Kemma', type='Turtle',
                species='Olive Ridley Turtle', date_tag='Oct 28, 2022', start_loc='Puntarenas, Costa Rica',
                last_ping='Middle America Trench', size='2ft. 6in.', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTchWSWHH42GMMnb5m7Ga6wHwoGrd2Y_Az0pA&usqp=CAU')
    a9 = Animal(name='Tj', type='Dolphin',
                species='Dolphin', date_tag='Jan 24, 2022, 8:03:00AM', start_loc='San Diego, CA',
                last_ping='San Diego, CA', size='4ft. 9in.', image='https://1471793142.rsc.cdn77.org/data/images/full/64002/dolphin-attack.jpg')
    a10 = Animal(name='Gale', type='Dolphin',
                species='Pilot Whale', date_tag='Aug 8, 2021 7:58:00AM', start_loc='Orlando, FL',
                last_ping='Virgina Beach', size='10ft.', image='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Pilot_whale.jpg/1200px-Pilot_whale.jpg')
    a11 = Animal(name='Vera', type='Turtle',
            species='Loggerhead Sea Turtle', date_tag='June 19, 2022', start_loc='Kyparissia Bay, Greece',
            last_ping='Gulf of Venice', size='2ft. 6in.', image='https://idsb.tmgrup.com.tr/ly/uploads/images/2021/06/06/119755.jpg')

    
    animals = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11]

    print('Creating Users...')

    u1 = User(first_last='Lauren Callahan',
              username='local',
              email='local@gmail.com')
    u1.password_hash = 'laurencallahan'
    u2 = User(first_last='Theresa Simon',
              username='treesimon',
              email='treesimon@gmail.com')
    u2.password_hash = 'treesimon'
    
    users = [u1, u2]

    print('Creating Researchers...')

    r1 = Research(first_last='Regan Svoboda',
              username='regansvoboda',
              email='regansvoboda@gmail.com')
    r1.password_hash = 'regansvoboda'
    r2 = Research(first_last='Keeley Svoboda',
              username='keeleysvoboda',
              email='keeleysvoboda@gmail.com')
    r2.password_hash = 'keeleysvoboda'
    
    researchers = [r1, r2]

    print('Creating Orders...')

    o1 = Order(user = u1, animal = a1)
    o2 = Order(user = u1, animal = a2)
    o3 = Order(user = u2, animal = a3)
    o4 = Order(user = u2, animal = a7)

    orders = [o1, o2, o3, o4]
    
    db.session.add_all(animals)
    db.session.add_all(users)
    db.session.add_all(researchers)
    db.session.add_all(orders)
    db.session.commit()

    print('Seeding Successful!')
