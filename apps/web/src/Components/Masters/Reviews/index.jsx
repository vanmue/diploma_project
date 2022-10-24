import React from "react";
import './revievs.scss'

function Reviews() {
    const image = require('../img/Ellipse.png')
    const star = require('../img/Star2.png')
    const revievs = [{
        img: image,
        name: 'Елена',
        rating: 4,
        reviev: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate'
    },
    {
        img: image,
        name: 'Наталья Петрова',
        rating: 5,
        reviev: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate'
    },
    {
        img: image,
        name: 'Светлана',
        rating: 3,
        reviev: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate'
    }
    ]

    return <div className="revievs__block">
        <h2 className="calendar__text">Отзывы:</h2>
        {revievs.map((item) =>
            <div key={item.name} className="reviev__card">
                <img className="reviev__card-img" src={item.img} alt={item.name} />
                <div >
                    <div className="reviev__name-rating">
                        <h3 className="reviev__name">{item.name}</h3>
                        <div className="reviev__rating">
                            {[...Array(item.rating)].map((e, index) =>
                                <img key={index + item.name} src={star} alt='star' />)}
                        </div>
                    </div>
                    <p className="reviev__text">{item.reviev}</p>
                </div>
            </div>
        )}
    </div>
}

export default Reviews