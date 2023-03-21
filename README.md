# projet-survive-js-

Jeu de survie en JavaScript simple créer grace à la biblioteque processing 5.

Les regles:
Vous controlez un objet sphérique blanc qui apparait en debut de jeu au millieu d'un canvas. Avec les touches directionnel, vous devez eviter les obstacle (des objet spherique rouge) qui appraissent à l'ecran à la vitesse de 1 par seconde.
Le jeu a été développé pour s'arreter lorsque le nombre d'obstacle max est atteind.

reglage:
Toutes modifications pour changer la difficulté se fait dans les variables global qui se trouve en haut du fichier sketch.js. Aucune modification dans le programme n'est necessaire.
Seul la vitesse d'apparition (càd 1 par seconde) ne peut pas etre modifier.
La variable nombresObstacles définit le temps en sec avant la fin du jeu.

Le fichier sketch(obstaclesimple).js est le fichier js qui a était développé avant l'incorporation du POO. il ne comporte que 1 obstacle.

On utilise le POO afin de permettre la création de plusieurs obstacles.
