let second_last = Math.floor(Date.now() / 1000);
let current = 0;
let d = 0;
let clear_sale_slider_slides = "";
let timer_sale;
let scrollStarted =0;

function run()
{
    window.addEventListener("scroll", scrolling);

    timer_sale = setInterval(sale_rotation, 3000);

    let slider_button_left = document.querySelectorAll(".slider-button-prev");
    slider_button_left.forEach((button)=>{

        button.setAttribute("disabled", true);

        button.addEventListener('click', (event)=>{
            console.log("left");
            let slider = event.currentTarget.closest(".slider");
            let slides = slider.querySelectorAll(".slide");
            
            let slides_all = slider.children[0].innerHTML;
            //slides_all = slides_all.replace(slides[0].outerHTML, "");
            //slides_all = slides[slides.length-1].outerHTML + slides_all;
            //slider.children[0].innerHTML = slides_all;

            let style = window.getComputedStyle(slider.children[0]);
            let matrix = new WebKitCSSMatrix(style.transform);
            console.log('translateX: ', matrix.m41);
            if (matrix.m41 < 0)
            {
                let width = slider.children[0].children[0].clientWidth;
                let x = -matrix.m41 - width;
                if(x<=0)
                {
                    event.currentTarget.setAttribute("disabled", true);
                    x = 0;
                }

                console.log('translateX: ', -x);
                slider.children[0].style.transform = `translateX(-${x}px)`;
            }
        });
    });

    let slider_button_right = document.querySelectorAll(".slider-button-next");
    slider_button_right.forEach((button)=>{
        button.addEventListener('click', (event)=>{
            console.log("right");
            let slider = event.currentTarget.closest(".slider");
            let slides = slider.querySelectorAll(".slide");
            
            let slides_all = slider.children[0].innerHTML;

            let style = window.getComputedStyle(slider.children[0]);
            let matrix = new WebKitCSSMatrix(style.transform);
            console.log('translateX: ', matrix.m41);
            let width = slider.children[0].children[0].clientWidth;
            let x = -matrix.m41 + width;
            let counter = Math.floor(x/width) -1;


            // slides_all = slides_all + slides[counter].outerHTML;
            // slider.children[0].innerHTML = slides_all;


            console.log('translateX: ', -x);
            slider.children[0].style.transform = `translateX(-${x}px)`;

            slider.querySelector(".slider-button-prev").removeAttribute("disabled"); //.setAttribute("disabled", "false");
        });
    });

    let button_add = document.querySelectorAll(".good_add");
    button_add.forEach((button)=>{
        button.addEventListener('click', (event)=>{
            let active_field = event.currentTarget.closest(".good_action");
            let cur = parseInt(active_field.children[0].children[1].innerHTML);
            cur = cur + 1;
            active_field.children[0].children[1].innerHTML = cur;
        });
    });

    let button_put_away = document.querySelectorAll(".good_put_away");
    button_put_away.forEach((button)=>{
        button.addEventListener('click', (event)=>{
            let active_field = event.currentTarget.closest(".good_action");
            let cur = parseInt(active_field.children[0].children[1].innerHTML);
            if (cur>0)
            {
                cur = cur - 1;
                active_field.children[0].children[1].innerHTML = cur;
            }
        });
    });

    menu();
}

function menu()
{
    const mainnav = document.querySelector(".main-nav");

    document.querySelector("#person").addEventListener('click', (evnt) => {
        mainnav.classList.toggle('main-nav--open');
    });

    document.querySelector(".back_to_main").addEventListener('click', (evnt) => {
        mainnav.classList.toggle('main-nav--open');
    });
}

function sale_rotation()
{
    console.log("sale ", current);
    const sale_slider_slides = document.querySelector(".sales>.slider>.slides");
    const sale_slides_array = sale_slider_slides.querySelectorAll(".slide");
    let width = sale_slides_array[0].clientWidth;
    //console.log("sale width=", width);

    let slider_num = current%sale_slides_array.length;

    if(clear_sale_slider_slides == "")
    {
        clear_sale_slider_slides = sale_slider_slides.innerHTML;
    }

    sale_slider_slides.innerHTML = sale_slider_slides.innerHTML + sale_slides_array[slider_num].outerHTML;

    //console.log(document.documentElement.clientWidth, "<", width*sale_slides_array.length);

    if(document.documentElement.clientWidth < width*sale_slides_array.length && d == 0)
    {
        d = width*sale_slides_array.length - document.documentElement.clientWidth;
        sale_slider_slides.style.transform = `translateX(-${d}px)`;
    }
    
    if(document.documentElement.clientWidth < width*sale_slides_array.length && d != 0)
    {
        current++;
        sale_slider_slides.style.transform = `translateX(-${current*width}px)`;
    }

    if(current > 100)
    {
        current = 0;
        sale_slider_slides.innerHTML = "";
        sale_slider_slides.style.transform = "translateX(0px)";
        sale_slider_slides.innerHTML = clear_sale_slider_slides;
        //clearInterval(timer_sale);
    }
}

function scrolling() {
    const scrollTop = window.pageYOffset;
    const header = document.querySelector("header");

    if(scrollStarted>scrollTop)
    {
        header.style.visibility = "Visible";
    }
    else
    {
        header.style.visibility = "Hidden";
    }

    console.log("scrollStarted=", scrollStarted, " scrollTop=", scrollTop);

    scrollStarted = scrollTop;
}

run();