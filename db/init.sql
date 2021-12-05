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
VALUES  ('Google Pixel Black', 500, 'https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_960_720.jpg'),
        ('Samsung S7', 300, 'https://cdn.pixabay.com/photo/2016/12/19/08/39/mobile-phone-1917737_960_720.jpg'),
        ('HTC 10 Black', 700, 'https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_960_720.jpg');

        
INSERT INTO public.ad(link, obrazok, pocitadlo)
VALUES  ('https://www.google.com/', 'https://cdn.pixabay.com/photo/2014/10/12/12/38/google-485611_960_720.jpg', 0)

-- zdroj: https://pixabay.com/