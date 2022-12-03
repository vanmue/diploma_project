import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServicesCard from '../../Components/ServicesCard';
import Select from '../../Components/Select';
import YandexMap from '../../Components/YandexMap';
import { getAllServiceGroupsThunk } from '../../actions/deliverablesActions';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction
} from '../../actions/stylesActions';
import './main-page.scss';

function MainPage() {

  const dispatch = useDispatch();
  const select = useSelector(store => ({
    deliverables: store.deliverablesReducer.deliverables,
    serviceGroups: store.deliverablesReducer.serviceGroups,
  }));

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(true));
    dispatch(changeHeaderBackgroundAction('rgba(65, 9, 53, 0.7)'));
    dispatch(changeNavigationColorAction('#FFFFFF'));
    dispatch(getAllServiceGroupsThunk());
  }, []);

  return (
    <div className='main-page'>
      <div className="main-page__insert">
        <div className="main-page__insert-title">
          <h1 className='main-page__h1'>Онлайн запись</h1>
          <p>В салон красоты на любую услугу к лучшим мастерам</p>
        </div>
      </div>
      <div className="main-page__services">
        <div className="container">
          <div className="main-page__services-body">
            <div className="main-page__services-desc">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu nibh vitae amet. Ipsum, pharetra donec ornare velit. Id at quisque accumsan risus ac ipsum ut. Sit elit, facilisi proin non malesuada sociis tristique. Viverra augue lorem ut quisque quam tortor, malesuada iaculis.
              </p>
              <p>
                Et elementum at nulla venenatis, faucibus integer. Auctor neque eros, viverra rutrum. Fames ultrices condimentum tortor nec penatibus. Velit imperdiet sapien fringilla vestibulum sit fames.
              </p>
            </div>
            <h3 className="main-page__services-h3">Найди своего мастера</h3>
            <div className="main-page__wrapp-select">
              <Select
                titleSelect={"Выберите город"}
              // cities={cities.cities}
              />
            </div>
            <h2 className="main-page__services-h2">Услуги</h2>
            <div className="main-page__services-list">
              {select.serviceGroups?.map(item => {
                return <div
                  className="main-page__wrapp-services-card"
                  data-deliverables={item?.id}
                  key={item?.id}
                >
                  <ServicesCard
                    title={item?.name}
                    pathImg={item?.image}
                  />
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h3 className="main-page__h3">
          Найди ближайший салон
        </h3>
      </div>
      <section className='main-page__yandex-map'>
        <h4>Яндекс карта</h4>
        <YandexMap
          center={[59.91796593897841, 30.304908500000003]} // Санкт-Петербург
          // center={[55.00202076433394, 82.95604349999992]} // Новосибирск
          // center={[56.30464518047854, 43.833528]} // Нижний Новгород
          // center={[55.75167053479295, 37.618488111084005]} // Москва
          zoom={10}
          items={[
            [59.93069550217494, 30.295617482627414],
            [59.93086781366939, 30.358445546592268],
            [60.018834992909085, 30.32203107969507]
          ]}
        />
      </section>
    </div>
  )
}

export default React.memo(MainPage);

//  - запись к мастеру:
// - создание записи
// POST / api / v1 / appointments /
// {
//   "shopId": 1,
//   "masterId": 6,
//   "deliverableId": 2,
//   "customerId": 1,
//   "comments": "могу опоздать",
//   "from": "2022-12-01T17:00:00+00:00",
//   "to": "2022-12-01T18:00:00+00:00"
// }

//   - изменение записи
// PATCH / api / v1 / appointments /: id /
// {
//   "comments": "могу опоздать1"
// }

//   - удаление записи:
// DELETE / api / v1 / appointments /: id /

//   - список имеющихся записей к мастеру:
// GET / api / v1 / masters / 6 / shops / 1 / appointments /


//     - создание изображения салона:

// - загрузить файл(multipart / form - data)
// POST / api / v1 / files /

//   - привязать файл к салону
// POST / api / v1 / shop - images /
// {
//   "shopId": 1,
//   "fileId": {{ file_id }},
// "is_preview": "false"
// }

// - изменить данные изображения салона:
// PATCH / api / v1 / shop - images /: shop_image_id /

//   - удалить привязку файла к салону и сам файл:
// /api/v1 / shop - images /: shop_image_id /


//     - создание салона:
// POST / api / v1 / shops /
// {
//   "cityId": 1,
//   "advantages": [1],
//   "name": "Barbershop Mens' House",
//   "address": "ул. Гагарина, 228",
//   "working_time": "с 10:00 до 21:00 без выходных",
//   "working_start": 10,
//   "working_end": 21,
//   "phone": "1234567890",
//   "center_longtitude": 59.91796593897841,
//   "center_latitude": 30.304908500000003,
//   "label_longtitude": 59.93069550217494,
//   "label_latitude": 30.295617482627414,
//   "zoom": 10
// }

// - запись к мастеру:

//   - создание записи
// POST /api/v1/appointments/
// {
//     "shopId": 1,
//     "masterId": 6,
//     "deliverableId": 2,
//     "customerId": 1,
//     "comments": "могу опоздать",
//     "from": "2022-12-01T17:00:00+00:00",
//     "to": "2022-12-01T18:00:00+00:00"
// }

//   - изменение записи
// PATCH /api/v1/appointments/:id/
// {
//     "comments": "могу опоздать1"
// }

//   - удаление записи:
// DELETE /api/v1/appointments/:id/

// - список имеющихся записей к мастеру:
// GET /api/v1/masters/6/shops/1/appointments/

// - создание изображения салона:

//   - загрузить файл (multipart/form-data)
// POST /api/v1/files/

//   - привязать файл к салону
// POST /api/v1/shop-images/
// {
//     "shopId": 1,
//     "fileId": {{file_id}},
//     "is_preview": "false"
// }
//   - изменить данные изображения салона:

// PATCH /api/v1/shop-images/:shop_image_id/

//   - удалить привязку файла к салону и сам файл:
// /api/v1/shop-images/:shop_image_id/

// - создание салона:
// POST /api/v1/shops/
// {
//     "cityId": 1 ,
//     "advantages": [ 1 ],
//     "name": "Barbershop Mens' House",
//     "address": "ул. Гагарина, 228",
//     "working_time": "с 10:00 до 21:00 без выходных",
//     "working_start": 10,
//     "working_end": 21,
//     "phone": "1234567890",
//     "center_longtitude": 59.91796593897841,
//     "center_latitude": 30.304908500000003,
//     "label_longtitude": 59.93069550217494,
//     "label_latitude": 30.295617482627414,
//     "zoom": 10
// }
// для записи к мастеру удалены поля имени и номера телефона
// customerId - это значение id пользователя из таблицы users

// - изменения users:

//   - загрузить файл аватара (multipart/form-data)
// POST /api/v1/files/

//   - создать пользователя
// POST /api/v1/users/
// {
//     "email": "test{{$timestamp}}@test.com",
//     "password": "12345",
//     "name": "Марина",
//     "surname": "Светлова",
//     "avatarId": {{file_id}}
// }
//   - получить данные пользователя:

// GET /api/v1/users/{{ user_id}}/

//   - изменить данные пользователя
// PATCH /api/v1/users/{{user_id}}/
// {
//     "name": "fake name 1",
//     "avatarId": 2
// }
//   - удалить пользователя (если пользователя привязан к мастеру/отзыву/записи к мастеру, то будет ошибка)
// DELETE /api/v1/users/{{ user_id}}/

//   - получить всех пользователей:
// GET /api/v1/users/

