INSERT INTO "category" ("name")
VALUES 
('Chocolaté'),
('Épicé'),
('Fruité'),
('Corsé'),
('Doux'),
('Acide');

-- 2 insertions de produits pour avoir 2 timestamp différents (pour avoir produits plus récents que d'autres)
INSERT INTO "coffee" ("name", "reference", "origin", "price_kilo", "category_id", "description", "availability")
VALUES 
('Espresso', 100955890, 'Italie', 20.99, 4, 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.', TRUE),
('Columbian', 100955894, 'Colombie', 18.75, 6, 'Café moyennement corsé avec une acidité vive et une saveur riche.', TRUE),
('Ethiopian Yirgacheffe', 105589090, 'Éthiopie', 22.50, 3, 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.', TRUE),
('Guatemalan Antigua', 256505890, 'Guatemala', 21.25, 4, 'Café corsé avec des nuances chocolatées et une pointe d''épice.', TRUE),
('Kenyan AA', 295432730, 'Kenya', 23.70, 6, 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.', TRUE),
('Sumatra Mandheling', 302932754, 'Indonésie', 19.95, 4, 'Café profond et terreux avec un corps lourd et une faible acidité.', TRUE),
('Costa Rican Tarrazu', 327302954, 'Costa Rica', 24.50, 6, 'Café vif et net avec une finition propre et une acidité vive.', TRUE),
('Vietnamese Robusta', 549549090, 'Vietnam', 16.75, 2, 'Café audacieux et fort avec une saveur robuste distinctive.', TRUE),
('Tanzanian Peaberry', 582954954, 'Tanzanie', 26.80, 3, 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.', TRUE),
('Rwandan Bourbon', 650753915, 'Rwanda', 21.90, 3, 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.', TRUE),
('Peruvian Arabica', 954589100, 'Pérou', 19.40, 1, 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.', FALSE),
('Hawaiian Kona', 958090105, 'Hawaï', 55.75, 5, 'Café rare au goût riche, une acidité douce et des nuances subtiles.', FALSE)
;

INSERT INTO "coffee" ("name", "reference", "origin", "price_kilo", "category_id", "description", "availability")
VALUES 
('Brazilian Santos', 134009550, 'Brésil', 17.80, 5, 'Café doux et lisse avec un profil de saveur de noisette.', TRUE),
('Jamaican Blue Mountain', 589100954, 'Jamaïque', 39.25, 5, 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.', TRUE),
('Panamanian Geisha', 795501340, 'Panama', 42.00, 3, 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.', TRUE),
('Nicaraguan Maragogipe', 691550753, 'Nicaragua', 28.60, 3, 'Café avec des notes de fruits, une acidité vive et un corps plein.', FALSE)
;