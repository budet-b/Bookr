INSERT INTO user_profile VALUES
    (DEFAULT, 'test1@test.com', 'lea', 'Lea', 'Ming', 'https://photos.cri.epita.net/lai_a', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test2@test.com', 'toubia_b', 'Alexandre', 'Toubiana', 'https://photos.cri.epita.net/toubia_b', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test3@test.com', 'budet_b', 'Benjamin', 'Budet', 'https://photos.cri.epita.net/budet_b', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test4@test.com', 'nedjad_f', 'Farah', 'Nedjadi', 'https://photos.cri.epita.net/nedjad_f', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test5@test.com', 'magnar_c', 'Clement', 'Magnard', 'https://photos.cri.epita.net/magnar_c', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test6@test.com', 'saille_r', 'Rodrigue', 'Saillenfest', 'https://photos.cri.epita.net/saille_r', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test7@test.com', 'fevre_p', 'Paul', 'Fevre', 'https://photos.cri.epita.net/fevre_p', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test8@test.com', 'touly_a', 'Andreas', 'Touly', 'https://photos.cri.epita.net/touly_a', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test9@test.com', 'dewolf_v', 'Valentin', 'Dewolf', 'https://photos.cri.epita.net/dewolf_v', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa'),
    (DEFAULT, 'test0@test.com', 'baujar_t', 'Theo', 'Baujard', 'https://photos.cri.epita.net/baujar_t', '$2b$10$W/k8.ONUZ4dlffbb.dS1K./n6QPKw1vPsqkWhVMAbxyzYy5b2RhPa');

INSERT INTO author VALUES
    (1, 'David Lopez'),
    (2, 'Marc Levy'),
    (3, 'Guillaume Musso'),
    (4, 'Michel Bussi'),
    (5, 'Leïla Slimani'),
    (6, 'Joël Dicker'),
    (7, 'Franck Thilliez'),
    (8, 'Lise Bourbeau'),
    (9, 'Squeezie'),
    (10, 'Leander Kahney'),
    (11, 'Walter Isaacson'),
    (12, 'Sylvain Tesson');


INSERT INTO book VALUES
    (
        1,
        '2021362159',
        'Fief',
        256,
        TIMESTAMP '2017-08-17',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/6b/44/86/8799339/1540-1/tsp20180605162243/Fief.jpg',
        'Quelque part entre la banlieue et la campagne, là où leurs parents ont eux-mêmes grandi, Jonas et ses amis tuent le temps. Ils fument, ils jouent aux cartes, ils font pousser de l herbe dans le jardin, et quand ils sortent, c est pour constater ce qui les éloigne des autres. Dans cet univers à cheval entre deux mondes, où tout semble voué à la répétition du même, leur fief, c est le langage, son usage et son accès, qu il soit porté par Lahuiss quand il interprète le Candide de Voltaire et explique aux autres comment parler aux filles pour les séduire, par Poto quand il rappe ou invective ses amis, par Ixe et ses sublimes fautes d orthographe. Ce qui est en jeu, c est la montée progressive d une poésie de l existence dans un monde sans horizon. Au fil de ce roman écrit au cordeau, une gravité se dégage, une beauté qu on extirpe du tragique ordinaire, à travers une voix neuve, celle de son auteur.',
        1
    ),
    (
        2,
        '2221157869',
        'Une fille comme elle',
        350,
        TIMESTAMP '2018-05-18',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/c0/85/90/9471424/1540-1/tsp20180413155915/Une-Fille-comme-elle.jpg',
        'Marc Levy est un multi-instrumentiste de l imaginaire… La plus jolie des comédies romantiques. Tout est sourire dans ce roman. Entrez au 12 de la Cinquième Avenue. Vous verrez, c est du plaisir à tous les étages. Pierre Vavasseur',
        2
    ),
    (
        3,
        '2702163637',
        'La Jeune Fille et la nuit',
        440,
        TIMESTAMP '2018-04-24',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/ce/58/8e/9328846/1540-1/tsp20180321092219/La-Jeune-Fille-et-la-Nuit.jpg',
        'Un campus prestigieux figé sous la neige\nTrois amis liés par un secret tragique\nUne jeune fille emportée par la nuit\nCôte d’Azur - Hiver 1992\nUne nuit glaciale, alors que le campus de son lycée est paralysé par une tempête de neige, Vinca Rockwell, 19 ans, l’une des plus brillantes élèves de classes prépas, s’enfuit avec son professeur de philo avec qui elle entretenait une relation secrète. Pour la jeune fille, l amour est tout ou il n’est rien ».\nPersonne ne la reverra jamais.\nCôte d’Azur - Printemps 2017\nAutrefois inséparables, Fanny, Thomas et Maxime – les meilleurs amis de Vinca – ne se sont plus parlé depuis la fin de leurs études. Ils se retrouvent lors d’une réunion d’anciens élèves. Vingt-cinq ans plus tôt, dans des circonstances terribles, ils ont tous les trois commis un meurtre et emmuré le cadavre dans le gymnase du lycée. Celui que l’on doit entièrement détruire aujourd’hui pour construire un autre bâtiment.',
        3
    ),
    (
        4,
        '2258113091',
        'Sang famille',
        420,
        TIMESTAMP '2018-05-16',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/7e/57/90/9459582/1540-1/tsp20180417102332/Sang-famille.jpg',
        'Mensonges ou secrets ?\nManipulation ou vérité ?\nSang famille\nDans la veine des meilleurs suspenses de Michel Bussi.\nTel un soleil brutal, la lumière du phare des Enchaînés inonde la pièce. Une seconde à peine. Puis l obscurité reprend le dessus, simplement percée du halo des lampes torches.\nJe vais mourir ici.\nC est une certitude.\nUne seule question me hante, la dernière : jusqu où sont-ils prêts à aller pour me faire avouer ? A fouiller ma mémoire, comme s ils pouvaient en arracher les souvenirs qu ils convoitent ?\nTout est allé si vite, à peine quatre jours.\nJe n étais alors qu un adolescent parmi d autres.\nUn orphelin.\nC est du moins ce qu on avait toujours voulu me faire croire...',
        3
    ),
    (
        5,
        '2072764920',
        'Chanson douce',
        280,
        TIMESTAMP '2018-05-03',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/88/ef/8e/9367432/1540-1/tsp20180309112421/Chanson-douce.jpg',
        'Louise ? Quelle chance vous avez d’être tombés sur elle. Elle a été comme une seconde mère pour mes garçons. Ça a été un vrai crève-cœur quand nous avons dû nous en séparer. Pour tout vous dire, à l’époque, j’ai même songé à faire un troisième enfant pour pouvoir la garder. Lorsque Myriam décide malgré les réticences de son mari de reprendre son activité au sein d’un cabinet d’avocats, le couple se met à la recherche d’une nounou. Après un casting sévère, ils engagent Louise et sont conquis par son aisance avec Mila et Adam, et par le soin bientôt indispensable qu’elle apporte à leur foyer, laissant progressivement s’installer le piège de la dépendance mutuelle. Prix Goncourt 2016 Grand Prix des Lectrices de ELLE 2017 Grand Prix des Lycéennes de ELLE 2017 Prix des Lecteurs Gallimard 2016',
        5
    ),
    (
        6,
        '2266282085',
        'La Dernière des Stanfield',
        448,
        TIMESTAMP '2018-05-18',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/4b/d0/8d/9293899/1540-1/tsp20180418120131/La-Derniere-des-Stanfield.jpg',
        'Ma vie a changé un matin alors que j ouvrais mon courrier. Une lettre anonyme m apprenait que ma mère avait commis un crime trente-cinq ans plus tôt. L auteur de cette lettre me donnait rendez-vous dans un bar de pêcheurs sur le port de Baltimore et m ordonnait de ne parler de cette histoire à personne.',
        2
    ),
    (
        7,
        '1032102004',
        'La Disparition de Stephanie Mailer',
        640,
        TIMESTAMP '2018-03-07',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/61/bc/8d/9288801/1540-1/tsp20180109080050/La-disparition-de-Stephanie-Mailer.jpg',
        '30 juillet 1994. Orphea, petite station balnéaire tranquille des Hamptons dans l’État de New York, est bouleversée par un effroyable fait divers: le maire de la ville et sa famille sont assassinés chez eux, ainsi qu’une passante, témoin des meurtres.L’enquête, confiée à la police d’État, est menée par un duo de jeunes policiers, Jesse Rosenberg et Derek Scott. Ambitieux et tenaces, ils parviendront à confondre le meurtrier, solides preuves à l’appui, ce qui leur vaudra les louanges de leur hiérarchie et même une décoration.Mais vingt ans plus tard, au début de l’été 2014, une journaliste du nom de Stephanie Mailer affirme à Jesse qu’il s’est trompé de coupable à l’époque.Avant de disparaitre à son tour dans des conditions mystérieuses.Qu’est-il arrivé à Stephanie Mailer?Qu’a-t-elle découvert?Et surtout: que s’est-il vraiment passé le soir du 30 juillet 1994 à Orphea?',
        6
    ),
    (
        8,
        '2266285025',
        'Un appartement à Paris',
        544,
        TIMESTAMP '2018-03-15',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/f2/cf/8d/9293810/1540-1/tsp20180205120621/Un-appartement-a-Paris.jpg',
        'Paris, un atelier d’artiste caché au fond d’une allée verdoyante. Madeline l’a loué pour s’y reposer et s’isoler. À la suite d’une méprise, cette jeune flic londonienne y voit débarquer Gaspard, un écrivain misanthrope venu des États-Unis pour écrire dans la solitude. Ces deux écorchés vifs sont contraints de cohabiter quelques jours.',
        3
    ),
    (
        9,
        '2266265849',
        'Maman a tort',
        544,
        TIMESTAMP '2016-05-04',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/97/de/77/7855767/1540-1/tsp20180320154712/Maman-a-tort.jpg',
        'Avec Maman à tort, Michel Bussi n hésite pas à bousculer les codes du roman policier. Nous voilà plongés dans la tête de Malone, un enfant de 3 ans et demi qui affirme à son psychologue scolaire que sa mère n est pas sa véritable mère. S en suit une course contre la montre sur un rythme haletant où notre résistance au suspens est mise à rude épreuve. Les retournements de situation qui s enchaînent nous entraînent de surprise en surprise. Rien n est prévisible jusqu à la dernière page. Nous pouvons remercier Michel Bussi d être aussi généreux avec ses lecteurs.',
        4
    ),
    (
        10,
        '2265117803',
        'Le manuscrit inachevé',
        528,
        TIMESTAMP '2018-05-03',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/df/57/90/9459679/1540-1/tsp20180222082724/Le-manuscrit-inacheve.jpg',
        'Un manuscrit sans fin, une enquête sans corps, une défunte sans visage... Aux alentours de Grenoble, un jeune a fini sa trajectoire dans un ravin après une course-poursuite avec la douane. Dans son coffre, le corps d une femme, les orbites vides, les mains coupées et rassemblées dans un sac. À la station-service où a été vue la voiture pour la dernière fois, la vidéosurveillance est claire : l homme qui conduisait n était pas le propriétaire du véhicule et encore moins le coupable.',
        7
    ),
    (
        11,
        '2266229486',
        'Les cinq blessures qui empêchent d être soi-même',
        256,
        TIMESTAMP '2013-01-17',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/6e/02/42/4325998/1540-1/tsp20170404130635/Les-5-bleures-qui-empechent-d-etre-soi-meme.jpg',
        'Lise BOURBEAU, auteur de nombreux best-sellers traduits dans le monde entier, est la fondatrice des éditions E.T.C. – Écoute Ton Corps –, devenues la plus grande école du développement personnel au Québec. Le rejet, l’abandon, l’humiliation, la trahison et l’injustice : cinq blessures fondamentales à l’origine de nos maux qu’ils soient physiques, émotionnels ou mentaux.',
        8
    ),
    (
        12,
        '2749934656',
        'Tourne la page',
        230,
        TIMESTAMP '2017-11-16',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/78/87/88/8947576/1540-1/tsp20171113104211/Tourne-la-page.jpg',
        'Le premier livre de Squeezie ! Cette couverture a attisé ta curiosité. Que se cache-t-il donc à l’intérieur de ce livre ?Des recettes de cuisine, l’autobiographie d’un inconnu, des blagues déjà dépassées ? Tourne la page et tu auras la réponse. Biographie(s) Lucas Hauchard dit SQUEEZIE est le YouTubeur gaming le plus suivi en France et le 3e plus grand YouTubeur français avec 9 millions d’abonnés et plus de 4 milliards de vues. Son premier ouvrage, Tourne la page, est très attendu par ses fans !Maxence Lapérouse dit MAXENSS est un chanteur et YouTubeur dont les décalées ont été vues plus de 21 millions de fois.',
        9
    ),
    (
        13,
        '2754059776',
        'Jony Ive - le génial designer d Apple',
        320,
        TIMESTAMP '2014-03-27',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/aa/be/56/5684906/1540-1/tsp20140314155332/Jony-Ive-le-genial-designer-d-Apple.jpg',
        'Jonathan Ive est Anglais. Il est designer industriel et travaille chez Apple depuis 1996. Il a réalisé avec un immense succès le design des iMac, iPod, iPhone, iPad. Devenu Vice-président chargé du design industriel, il a imposé, en compagnie de Steve Jobs, le design comme une priorité pour la firme. Anobli par la reine du Royaume-Uni en 2012, il reste cependant quelqu un de discret. Steve Jobs l appelait Jony.',
        10
    ),
    (
        14,
        '2253168521',
        'Steve Jobs',
        952,
        TIMESTAMP '2012-03-10',
        'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/2/2/5/9782253168522/tsp20120918163211/Steve-Jobs.jpg',
        'À partir d une quarantaine d interviews exclusives et de multiples rencontres avec sa famille, ses proches, ses collaborateurs, ses amis comme ses adversaires, Walter Isaacson a reconstitué d une façon magistrale et passionnée la vie, l œuvre et la pensée du fondateur d’Apple, l un des plus grands innovateurs et visionnaires de notre époque.Une biographie passionnante qui révèle combien les détours apparents d’un parcours individuel constituent les étapes décisives dans les destinées humaines. Un vrai roman, celui d’un homme qui n’a cessé de ses dépasser, et de transformer le monde, mais qui était avant tout un homme. Valérie Segond, La Tribune.',
        11
    ),
    (
        15,
        '284990550X',
        'Un été avec Homère',
        290,
        TIMESTAMP '2018-04-19',
        'https://static.fnac-static.com/multimedia/Images/FR/NR/37/d5/8d/9295159/1540-1/tsp20180329120557/Un-ete-avec-Homere.jpg',
        'Au long de l Iliade et de l Odyssée chatoient la lumière, l adhésion au monde, la tendresse pour les bêtes, les forêts - en un mot, la douceur de la vie. N entendez-vous pas la musique des ressacs en ouvrant ces deux livres ? Certes, le choc des armes la recouvre parfois. Mais elle revient toujours, cette chanson d amour adressée à notre part de vie sur la terre. Homère est le musicien. Nous vivons dans l écho de sa symphonie.',
        12
    );

INSERT INTO user_book VALUES
    (DEFAULT, 1, 1, TIMESTAMP '2018-01-01 00:00:00', 0, 120),
    (DEFAULT, 2, 2, TIMESTAMP '2018-01-01 00:00:00', 0, 110),
    (DEFAULT, 3, 3, TIMESTAMP '2018-01-01 00:00:00', 0, 125),
    (DEFAULT, 4, 4, TIMESTAMP '2018-01-01 00:00:00', 0, 200),
    (DEFAULT, 5, 5, TIMESTAMP '2018-01-01 00:00:00', 0, 136),
    (DEFAULT, 6, 1, TIMESTAMP '2018-01-01 00:00:00', 1, 256),
    (DEFAULT, 5, 3, TIMESTAMP '2018-01-01 00:00:00', 0, 100),
    (DEFAULT, 4, 3, TIMESTAMP '2018-01-01 00:00:00', 0, 130),
    (DEFAULT, 5, 2, TIMESTAMP '2018-01-01 00:00:00', 0, 123),
    (DEFAULT, 3, 4, TIMESTAMP '2018-01-01 00:00:00', 0, 640);


INSERT INTO user_relationship VALUES
    (DEFAULT, 1, 2, 0, 1),
    (DEFAULT, 2, 3, 1, 2),
    (DEFAULT, 3, 4, 2, 4),
    (DEFAULT, 1, 4, 2, 4),
    (DEFAULT, 1, 5, 2, 5),
    (DEFAULT, 1, 6, 2, 1),
    (DEFAULT, 4, 5, 0, 5),
    (DEFAULT, 1, 7, 2, 1),
    (DEFAULT, 3, 5, 2, 5),
    (DEFAULT, 4, 7, 1, 7);

INSERT INTO newsfeed VALUES
    (DEFAULT, 1, 1, TIMESTAMP '2018-06-11 22:43:06.351', 0, 5),
    (DEFAULT, 1, 1, TIMESTAMP '2018-06-11 22:43:08.992', 0, 10),
    (DEFAULT, 1, 1, TIMESTAMP '2018-06-11 22:43:11.521', 0, 130),
    (DEFAULT, 1, 1, TIMESTAMP '2018-06-11 22:43:14.907', 0, 180),
    (DEFAULT, 1, 1, TIMESTAMP '2018-06-11 22:43:17.6620', 0, 200),
    (DEFAULT, 1, 1, TIMESTAMP '2018-06-11 22:43:20.351', 0, 205),
    (DEFAULT, 1, 1, TIMESTAMP '2018-06-11 22:43:44.992', 0, 210),
    (DEFAULT, 1, 1, TIMESTAMP '2018-06-11 22:43:45.521', 0, 230),
    (DEFAULT, 5, 1, TIMESTAMP '2018-01-01 00:00:00', 0, 123),
    (DEFAULT, 3, 2, TIMESTAMP '2018-01-01 00:00:00', 0, 640);
