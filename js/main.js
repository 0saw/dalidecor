var nDesign = new function () {
  var self = this;  

  this.init = function () {
    self.pElement = document.querySelector('#lParallax img');
    self.pElementHeight = self.pElement.offsetHeight;

    self.wResizeHandler();

    self.searchButton();

    self.slider();

    // Parallax
    self.parallax();
    window.addEventListener('scroll', self.parallax);
    window.addEventListener('resize', self.wResizeHandler);
  };

  this.slider = function () {
    $('.l-slider').on('init', function (slick) {
      $('.loader').remove();
    }).slick({
      dots: true,
      prevArrow: '<img class="slick-prev" src="images/design/previous.png" srcset="images/design/previous.png 1x, images/design/previous@2x.png 2x" width="64" height="64" alt="Prev" />',
      nextArrow: '<img class="slick-next" src="images/design/skip.png" srcset="images/design/skip.png 1x, images/design/skip@2x.png 2x" width="64" height="64" alt="Next" />',
    });

    $('.l-popular').slick({
      mobileFirst: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1280,
        settings: 'unslick'
      }, {
        breakpoint: 0,
        settings: {
          slidesToShow: 2
        }
      }]
    });
  };

  this.searchButton = function () {
    self.searchButton = document.getElementById('searchBtn');
    self.searchButtonContainer = self.searchButton.parentNode.parentNode;
    self.searchInput = document.querySelector('.header__search input');

    document.addEventListener('click', self.handleSearchClick);
  };

  this.handleSearchClick = function (event) {
    if (self.searchButtonContainer.contains(event.target)) {
      if (!self.searchActive) {
        event.preventDefault();
        event.stopPropagation();

        self.searchActive = true;
        st.addClass(self.searchButtonContainer, 'active');
        self.searchInput.focus();
      }
    } else {
      self.searchActive = false;
      event.stopPropagation();
      st.removeClass(self.searchButtonContainer, 'active');
    }
  }

  this.parallax = function () {
    if (!self.isBusy) {
      self.isBusy = true;
      st.raf(function () {
        self.render();
        self.isBusy = false;
      });
    }
  };

  this.render = function () {
    self.pElement.style[st.cssProps.transf] = 'translate3d(0, -' + self.delta * self.scrollTop() + 'px, 0)';
  };

  this.wResizeHandler = function () {
    var w = window.innerWidth
         || document.documentElement.clientWidth
         || document.body.clientWidth;
 
    var h = window.innerHeight
         || document.documentElement.clientHeight
         || document.body.clientHeight;

    self.vW = w;
    self.vH = h;

    if (self.pElementHeight - self.vH <= 0) {
      self.delta = 0;
      return;
    }
    self.delta = (self.pElementHeight - self.vH) / self.docHeight();
  };

  this.scrollTop = function () {
    return window.pageYOffset || document.documentElement.scrollTop;
  };

  this.docHeight = function () {
    var B = document.body,
        H = document.documentElement,
        height;

    if (typeof document.height !== 'undefined') {
      height = document.height // For webkit browsers
    } else {
      height = Math.max( B.scrollHeight, B.offsetHeight,H.clientHeight, H.scrollHeight, H.offsetHeight );
    }
    return height;
  }
}


st.ready(function () {
  nDesign.init();
});