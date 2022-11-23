import React from "react";
import './revievs.scss'
import image from '../img/Ellipse.png'
import imgStar from '../img/Star2.png'

function Reviews({ record }) {
    // const revievs = [{
    //     img: image,
    //     name: 'Елена',
    //     rating: 4,
    //     reviev: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate'
    // }
    // ]
    //console.log(record?.reviews)

    return <div className="revievs__block">
        <h2 className="calendar__text">Отзывы:</h2>
        {record?.reviews.map((item) =>

            <div key={item.id} className="reviev__card">
                {console.log(item)}
                <img className="reviev__card-img" src={item?.author.avatar} alt={item?.author.name} />
                <div >
                    <div className="reviev__name-rating">
                        <h3 className="reviev__name">{item.author.name}</h3>
                        <div className="reviev__rating">
                            {console.log([...Array(item.score)])}
                            {[...Array(item.score)].map((e, index) =>
                                < img key={item.id + index} src={imgStar} alt='star' />
                            )}
                        </div>
                    </div>
                    <p className="reviev__text">{item.review}</p>
                </div>
            </div>
        )}
    </div>
}

export default Reviews