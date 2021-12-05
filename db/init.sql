ALTER USER postgres WITH PASSWORD 'password';

CREATE TABLE IF NOT EXISTS public.products (
    id serial PRIMARY KEY,
    nazov varchar NOT NULL,
    obrazok varchar NOT NULL,
    cena integer NOT NULL
);

CREATE TABLE IF NOT EXISTS public.customers (
    id SERIAL PRIMARY KEY,
    email varchar UNIQUE NOT NULL,
    meno varchar NOT NULL,
    adresa varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS public.orders (
    produkty varchar NOT NULL,
    stav varchar NOT NULL,
    customer_id integer REFERENCES customers
);

CREATE TABLE IF NOT EXISTS public.ad (
    id SERIAL PRIMARY KEY,
    link varchar NOT NULL,
    obrazok varchar NOT NULL,
    pocitadlo integer NOT NULL
);

ALTER TABLE public.products OWNER to postgres;
ALTER TABLE public.customers OWNER to postgres;
ALTER TABLE public.orders OWNER to postgres;
ALTER TABLE public.ad OWNER to postgres;

INSERT INTO public.products(nazov, cena, obrazok)
VALUES  ('Google Pixel Black', 500, 'https://m.media-amazon.com/images/I/713N4SwTtKL._AC_SL1500_.jpg'),
        ('Samsung S7', 300, 'https://www.mytrendyphone.eu/images2/Spigen-Rugged-Armor-TPU-Case-for-Samsung-Galaxy-S7-Black-27042016-03-p.jpg'),
        ('HTC 10 Black', 700, 'https://eunnu.com/u_file/1809/products/12/562276a23e.jpg');

        
INSERT INTO public.ad(link, obrazok, pocitadlo)
VALUES  ('https://www.google.com/', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1024px-Google_2015_logo.svg.png', 0)