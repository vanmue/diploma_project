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