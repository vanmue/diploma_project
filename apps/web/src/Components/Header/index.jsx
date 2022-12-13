import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isActiveSignInModalAction } from "../../actions/authorizationActions";
import Navigation from "../Navigation";
import SignIn from "../SignIn";
import SignInModal from "../SignInModal";
import ListProfiles from "../ListProfiles";
import './header.scss';

// const userStructure = JSON.parse(localStorage.getItem("userStructure"));

function Header() {
  const select = useSelector(store => ({
    isMain: store.stylesReducer.header.isMain,
    headerBackground: store.stylesReducer.header.background,
    isActiveSignInModal: store.authorizationReducer.isActiveSignInModal,
    // userStructure: store.authorizationReducer.authData.userStructure,
  }));

  const [modalIsActive, setModalIsActive] = useState(false);
  const [profileListIsActive, setProfileListIsActive] = useState(false);
  const dispatch = useDispatch();
  // const handleMouseEnterWrappSignIn = () => {
  //   setProfileListIsActive(prevProfileListIsActive => !prevProfileListIsActive);
  // }

  const callbacks = {
    onSetIsActiveModal: useCallback(() => {
      dispatch(isActiveSignInModalAction(!select.isActiveSignInModal));
      // setModalIsActive(prevModalIsActive => !prevModalIsActive)
    }),
    onHoverBtnProfile: useCallback(() => {
      setProfileListIsActive(prevProfileListIsActive => !prevProfileListIsActive);
    })
  }

  return (
    <header className="header" style={{ background: `${select.headerBackground}` }}>
      <div className="container">
        <div className="header__flex">
          {select.isMain ?
            <svg width="355" height="67" viewBox="0 0 353 43" fill="none">
              <path d="M0.153409 1.27273H9.7983L19.0852 18.8125H19.483L28.7699 1.27273H38.4148L23.5597 27.6023V42H15.0085V27.6023L0.153409 1.27273ZM78.0831 21.6364C78.0831 26.0777 77.2412 29.8561 75.5575 32.9716C73.8871 36.0871 71.6068 38.4669 68.7166 40.1108C65.8397 41.7415 62.6049 42.5568 59.0121 42.5568C55.3928 42.5568 52.1446 41.7348 49.2678 40.0909C46.3909 38.447 44.1172 36.0672 42.4467 32.9517C40.7763 29.8362 39.9411 26.0644 39.9411 21.6364C39.9411 17.1951 40.7763 13.4167 42.4467 10.3011C44.1172 7.18561 46.3909 4.8125 49.2678 3.18182C52.1446 1.53788 55.3928 0.715908 59.0121 0.715908C62.6049 0.715908 65.8397 1.53788 68.7166 3.18182C71.6068 4.8125 73.8871 7.18561 75.5575 10.3011C77.2412 13.4167 78.0831 17.1951 78.0831 21.6364ZM69.353 21.6364C69.353 18.7595 68.9221 16.3333 68.0604 14.358C67.2119 12.3826 66.0121 10.8845 64.4609 9.86364C62.9098 8.8428 61.0935 8.33239 59.0121 8.33239C56.9306 8.33239 55.1143 8.8428 53.5632 9.86364C52.0121 10.8845 50.8056 12.3826 49.9439 14.358C49.0954 16.3333 48.6712 18.7595 48.6712 21.6364C48.6712 24.5133 49.0954 26.9394 49.9439 28.9148C50.8056 30.8902 52.0121 32.3883 53.5632 33.4091C55.1143 34.4299 56.9306 34.9403 59.0121 34.9403C61.0935 34.9403 62.9098 34.4299 64.4609 33.4091C66.0121 32.3883 67.2119 30.8902 68.0604 28.9148C68.9221 26.9394 69.353 24.5133 69.353 21.6364ZM109.618 1.27273H118.229V27.7216C118.229 30.6913 117.519 33.2898 116.101 35.517C114.696 37.7443 112.727 39.4811 110.195 40.7273C107.662 41.9602 104.713 42.5767 101.345 42.5767C97.9645 42.5767 95.0081 41.9602 92.4759 40.7273C89.9437 39.4811 87.9749 37.7443 86.5696 35.517C85.1643 33.2898 84.4616 30.6913 84.4616 27.7216V1.27273H93.0724V26.9858C93.0724 28.5369 93.4105 29.9157 94.0866 31.1222C94.776 32.3286 95.7438 33.2765 96.9901 33.9659C98.2363 34.6553 99.688 35 101.345 35C103.016 35 104.467 34.6553 105.7 33.9659C106.946 33.2765 107.908 32.3286 108.584 31.1222C109.273 29.9157 109.618 28.5369 109.618 26.9858V1.27273Z" fill="#F5BFAB" />
              <path d="M125.313 42V1.27273H141.62C144.616 1.27273 147.115 1.71686 149.117 2.60511C151.119 3.49337 152.624 4.72633 153.631 6.30398C154.639 7.86837 155.143 9.6714 155.143 11.7131C155.143 13.304 154.825 14.7027 154.188 15.9091C153.552 17.1023 152.677 18.0833 151.563 18.8523C150.463 19.608 149.203 20.1449 147.785 20.4631V20.8608C149.336 20.9271 150.788 21.3646 152.14 22.1733C153.505 22.982 154.612 24.1155 155.461 25.5739C156.309 27.0189 156.734 28.7424 156.734 30.7443C156.734 32.9053 156.197 34.8343 155.123 36.5312C154.062 38.215 152.491 39.5473 150.41 40.5284C148.328 41.5095 145.763 42 142.714 42H125.313ZM133.924 34.9602H140.944C143.344 34.9602 145.094 34.5028 146.194 33.5881C147.294 32.66 147.844 31.4271 147.844 29.8892C147.844 28.7623 147.573 27.768 147.029 26.9062C146.486 26.0445 145.71 25.3684 144.702 24.8778C143.708 24.3873 142.522 24.142 141.143 24.142H133.924V34.9602ZM133.924 18.3153H140.308C141.487 18.3153 142.535 18.1098 143.45 17.6989C144.378 17.2746 145.107 16.678 145.637 15.9091C146.181 15.1402 146.452 14.2188 146.452 13.1449C146.452 11.6733 145.929 10.4867 144.881 9.58523C143.847 8.68371 142.376 8.23295 140.467 8.23295H133.924V18.3153ZM162.337 42V1.27273H189.78V8.37216H170.947V18.0767H188.368V25.1761H170.947V34.9006H189.859V42H162.337ZM203.646 42H194.418L208.478 1.27273H219.575L233.614 42H224.387L214.185 10.5795H213.867L203.646 42ZM203.069 25.9915H224.864V32.7131H203.069V25.9915ZM263.673 1.27273H272.283V27.7216C272.283 30.6913 271.574 33.2898 270.156 35.517C268.75 37.7443 266.781 39.4811 264.249 40.7273C261.717 41.9602 258.767 42.5767 255.4 42.5767C252.019 42.5767 249.063 41.9602 246.531 40.7273C243.998 39.4811 242.03 37.7443 240.624 35.517C239.219 33.2898 238.516 30.6913 238.516 27.7216V1.27273H247.127V26.9858C247.127 28.5369 247.465 29.9157 248.141 31.1222C248.831 32.3286 249.799 33.2765 251.045 33.9659C252.291 34.6553 253.743 35 255.4 35C257.07 35 258.522 34.6553 259.755 33.9659C261.001 33.2765 261.962 32.3286 262.638 31.1222C263.328 29.9157 263.673 28.5369 263.673 26.9858V1.27273ZM277.817 8.37216V1.27273H311.266V8.37216H298.797V42H290.286V8.37216H277.817ZM314.388 1.27273H324.033L333.32 18.8125H333.717L343.004 1.27273H352.649L337.794 27.6023V42H329.243V27.6023L314.388 1.27273Z" fill="white" />
            </svg> :
            <svg width="353" height="43" viewBox="0 0 353 43" fill="none">
              <path d="M0.153409 1.27273H9.7983L19.0852 18.8125H19.483L28.7699 1.27273H38.4148L23.5597 27.6023V42H15.0085V27.6023L0.153409 1.27273ZM78.0831 21.6364C78.0831 26.0777 77.2412 29.8561 75.5575 32.9716C73.8871 36.0871 71.6068 38.4669 68.7166 40.1108C65.8397 41.7415 62.6049 42.5568 59.0121 42.5568C55.3928 42.5568 52.1446 41.7348 49.2678 40.0909C46.3909 38.447 44.1172 36.0672 42.4467 32.9517C40.7763 29.8362 39.9411 26.0644 39.9411 21.6364C39.9411 17.1951 40.7763 13.4167 42.4467 10.3011C44.1172 7.18561 46.3909 4.8125 49.2678 3.18182C52.1446 1.53788 55.3928 0.715908 59.0121 0.715908C62.6049 0.715908 65.8397 1.53788 68.7166 3.18182C71.6068 4.8125 73.8871 7.18561 75.5575 10.3011C77.2412 13.4167 78.0831 17.1951 78.0831 21.6364ZM69.353 21.6364C69.353 18.7595 68.9221 16.3333 68.0604 14.358C67.2119 12.3826 66.0121 10.8845 64.4609 9.86364C62.9098 8.8428 61.0935 8.33239 59.0121 8.33239C56.9306 8.33239 55.1143 8.8428 53.5632 9.86364C52.0121 10.8845 50.8056 12.3826 49.9439 14.358C49.0954 16.3333 48.6712 18.7595 48.6712 21.6364C48.6712 24.5133 49.0954 26.9394 49.9439 28.9148C50.8056 30.8902 52.0121 32.3883 53.5632 33.4091C55.1143 34.4299 56.9306 34.9403 59.0121 34.9403C61.0935 34.9403 62.9098 34.4299 64.4609 33.4091C66.0121 32.3883 67.2119 30.8902 68.0604 28.9148C68.9221 26.9394 69.353 24.5133 69.353 21.6364ZM109.618 1.27273H118.229V27.7216C118.229 30.6913 117.519 33.2898 116.101 35.517C114.696 37.7443 112.727 39.4811 110.195 40.7273C107.662 41.9602 104.713 42.5767 101.345 42.5767C97.9645 42.5767 95.0081 41.9602 92.4759 40.7273C89.9437 39.4811 87.9749 37.7443 86.5696 35.517C85.1643 33.2898 84.4616 30.6913 84.4616 27.7216V1.27273H93.0724V26.9858C93.0724 28.5369 93.4105 29.9157 94.0866 31.1222C94.776 32.3286 95.7438 33.2765 96.9901 33.9659C98.2363 34.6553 99.688 35 101.345 35C103.016 35 104.467 34.6553 105.7 33.9659C106.946 33.2765 107.908 32.3286 108.584 31.1222C109.273 29.9157 109.618 28.5369 109.618 26.9858V1.27273Z" fill="#A40123" />
              <path d="M125.313 42V1.27273H141.62C144.616 1.27273 147.115 1.71686 149.117 2.60511C151.119 3.49337 152.624 4.72633 153.631 6.30398C154.639 7.86837 155.143 9.6714 155.143 11.7131C155.143 13.304 154.825 14.7027 154.188 15.9091C153.552 17.1023 152.677 18.0833 151.563 18.8523C150.463 19.608 149.203 20.1449 147.785 20.4631V20.8608C149.336 20.9271 150.788 21.3646 152.14 22.1733C153.505 22.982 154.612 24.1155 155.461 25.5739C156.309 27.0189 156.734 28.7424 156.734 30.7443C156.734 32.9053 156.197 34.8343 155.123 36.5312C154.062 38.215 152.491 39.5473 150.41 40.5284C148.328 41.5095 145.763 42 142.714 42H125.313ZM133.924 34.9602H140.944C143.344 34.9602 145.094 34.5028 146.194 33.5881C147.294 32.66 147.844 31.4271 147.844 29.8892C147.844 28.7623 147.573 27.768 147.029 26.9062C146.486 26.0445 145.71 25.3684 144.702 24.8778C143.708 24.3873 142.522 24.142 141.143 24.142H133.924V34.9602ZM133.924 18.3153H140.308C141.487 18.3153 142.535 18.1098 143.45 17.6989C144.378 17.2746 145.107 16.678 145.637 15.9091C146.181 15.1402 146.452 14.2188 146.452 13.1449C146.452 11.6733 145.929 10.4867 144.881 9.58523C143.847 8.68371 142.376 8.23295 140.467 8.23295H133.924V18.3153ZM162.337 42V1.27273H189.78V8.37216H170.947V18.0767H188.368V25.1761H170.947V34.9006H189.859V42H162.337ZM203.646 42H194.418L208.478 1.27273H219.575L233.614 42H224.387L214.185 10.5795H213.867L203.646 42ZM203.069 25.9915H224.864V32.7131H203.069V25.9915ZM263.673 1.27273H272.283V27.7216C272.283 30.6913 271.574 33.2898 270.156 35.517C268.75 37.7443 266.781 39.4811 264.249 40.7273C261.717 41.9602 258.767 42.5767 255.4 42.5767C252.019 42.5767 249.063 41.9602 246.531 40.7273C243.998 39.4811 242.03 37.7443 240.624 35.517C239.219 33.2898 238.516 30.6913 238.516 27.7216V1.27273H247.127V26.9858C247.127 28.5369 247.465 29.9157 248.141 31.1222C248.831 32.3286 249.799 33.2765 251.045 33.9659C252.291 34.6553 253.743 35 255.4 35C257.07 35 258.522 34.6553 259.755 33.9659C261.001 33.2765 261.962 32.3286 262.638 31.1222C263.328 29.9157 263.673 28.5369 263.673 26.9858V1.27273ZM277.817 8.37216V1.27273H311.266V8.37216H298.797V42H290.286V8.37216H277.817ZM314.388 1.27273H324.033L333.32 18.8125H333.717L343.004 1.27273H352.649L337.794 27.6023V42H329.243V27.6023L314.388 1.27273Z" fill="#410935" />
            </svg>
          }
          <div className="header-item">
            <div className="header__wrapp-navigation">
              <Navigation />
            </div>

            <div className="header__profile">
              <div className="header__wrapp-sign-in"
              // style={{ background: "transparent" }}
              // onMouseEnter={handleMouseEnterWrappSignIn}
              >
                <SignIn
                  onClick={JSON.parse(localStorage.getItem("userStructure")) ? callbacks.onHoverBtnProfile : callbacks.onSetIsActiveModal}
                // linkTo="/salon-admine-office"
                >
                  {localStorage.getItem("access_token") ? "Профиль" : "Войти"}
                </SignIn>
              </div>
              {JSON.parse(localStorage.getItem("userStructure")) &&
                <div className="header__wrapp-profile-list"
                  style={{ display: profileListIsActive ? "block" : "none" }}
                >
                  <ListProfiles
                  // userStructure={userStructure}
                  />
                </div>}

            </div>

          </div>
          {select.isActiveSignInModal &&
            <div className="header__wrapp-sign-in-modal">
              <SignInModal
                // isActive={modalIsActive}
                onClick={callbacks.onSetIsActiveModal}
              />
            </div>
          }
          {/* {modalIsActive &&
            <div className="header__wrapp-sign-in-modal">
              <SignInModal
                // isActive={modalIsActive}
                onClick={callbacks.onSetIsActiveModal}
              />
            </div>
          } */}

          {/* <SignInModal
            isActive={modalIsActive}
            onClick={callbacks.onSetIsActiveModal}
          /> */}
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header);