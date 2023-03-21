// Declaration et initialisation des variables

let widthCanvas = 400; //Largeur du plan de travail
let heightCanvas = 300; //Hauteur du plan de travail
let positionObjetX = widthCanvas/2; //Position X de depart de l'objet
let positionObjetY = heightCanvas/2; //Position Y de depart de l'objet
let diametreObjet = 30; //Diametre de l'objet
let vitesseObjet = 5; // vitesse de déplacement du joueur
let posObstacleX;
let posObstacleY;
let diametreObstacle = 10; //diametre des obstacles
let vitesseObstacle = 1; //vitesse des obstacles
let directionObstacle;
let sensObstacle;
let tempsEcoule;

//Fonction principale

function setup() {//Toute fonction dans"setup" ne sera invoqué que 1 fois
    createCanvas(widthCanvas,heightCanvas);//on cree une zone de travail
    //ATTENTION: random() ne peut pas etre appele en dehors des fonction setup() ou draw()
    posObstacleX = random() * widthCanvas; //on attribut une coordonne X aleatoire à l'obstacle
    posObstacleY = random() * heightCanvas; //on attribut une coordonne Y aleatoire à l'obstacle
    directionObstacle = randomOne(); //on choisit une direction aléatoire (dans le sens positif ou negatif de l'axe)
    sensObstacle = randomOne(); //On choisit si il se deplacera verticalement ou Horizontalement
}

function draw() { //une fonction qui boucle en continue jusqu'a l'infini
    calculerTempsEcoule ();
    background('gray'); //on donne une couleur au background de la zone de travail
    updatePositionCercle();
    updatePositionObstacle();
    circle(positionObjetX, positionObjetY, diametreObjet);
    fill('red');
    circle(posObstacleX, posObstacleY, diametreObstacle);
    text(tempsEcoule,widthCanvas/2,heightCanvas - 30);//On affiche le temps ecoule
    finDuJeu();//on test si on a perdu
}

//Fonction secondaire

function updatePositionCercle ()// fonction qui bouge l'objet lorsque on appuie sur une fleche
{
    if (keyIsDown(RIGHT_ARROW))
    {
        if (testOutOfScreen('Right',diametreObjet,positionObjetX,positionObjetY)) {
        positionObjetX = positionObjetX + vitesseObjet;
        }
    }

    if (keyIsDown(LEFT_ARROW))
    {
        if (testOutOfScreen('Left',diametreObjet,positionObjetX,positionObjetY)) {
            positionObjetX = positionObjetX - vitesseObjet;
        }
    }

    if (keyIsDown(DOWN_ARROW))
    {
        if (testOutOfScreen('Down',diametreObjet,positionObjetX,positionObjetY)) {
            positionObjetY = positionObjetY + vitesseObjet;
        }
    }

    if (keyIsDown(UP_ARROW))
    {
        if (testOutOfScreen('Up',diametreObjet,positionObjetX,positionObjetY)) {
            positionObjetY = positionObjetY - vitesseObjet;
        }
    }
}

function testOutOfScreen(Direction,diametreCercle,positionX,positionY)
{// une fonction qui teste si on est en bord de zone de travail. Return False si on est au bord
    if (positionX - diametreCercle/2 > 0 && Direction == 'Left') {
        return true;
    }

    if (positionY + diametreCercle/2 < heightCanvas && Direction == 'Down') {
        return true;
    }
    
    if (positionX + diametreCercle/2 < widthCanvas && Direction == 'Right') {
        return true;
    }
    
    if (positionY - diametreCercle/2 > 0 && Direction == 'Up') {
        return true;
    }

    else {
        return false;
    }
}

function updatePositionObstacle() {//une fonction qui bouge l'obstacle
    if(sensObstacle == 1)//Si l'obstacle bouge suivant X
    {
        posObstacleX = posObstacleX + directionObstacle * vitesseObstacle;
         
        if (!testOutOfScreen('Left',diametreObstacle,posObstacleX,posObstacleY) || !testOutOfScreen('Right',diametreObstacle,posObstacleX,posObstacleY))
        {
            directionObstacle = directionObstacle * (-1);
        }//si l'obstacle est au bord, on change son sens
    }

    if(sensObstacle == -1)//Si l'obstacle bouge suivant Y
    {
        posObstacleY = posObstacleY + directionObstacle * vitesseObstacle;

        if (!testOutOfScreen('Up',diametreObstacle,posObstacleX,posObstacleY) || !testOutOfScreen('Down',diametreObstacle,posObstacleX,posObstacleY))
        {
            directionObstacle = directionObstacle * (-1);
        }
    }
}
 
function testColision() { //On va tester la distance entre l'objet et l'obstacle
   if (dist(positionObjetX, positionObjetY, posObstacleX, posObstacleY) - (diametreObjet+diametreObstacle)/2 <= 0)
   { //Lorsqu'il y a collision, on retourne "true"
    fill("blue");
    return true;
   }
   else { 
    fill("white");
    return false;
   }
}

function calculerTempsEcoule () {// On mesure le temps ecoule
    let tempsEcouleMinute;
    let tempsEcouleSeconds;

    tempsEcoule = round(millis()/1000); // la valeur en seconde du temps ecoule
    
    if (tempsEcoule >= 60){ //On change l'affichage pour le mettre en minute si on a + de 60 sec
        tempsEcouleMinute = int(tempsEcoule/60);
        tempsEcouleSeconds = tempsEcoule%60;
        tempsEcoule = tempsEcouleMinute + ' min ' + tempsEcouleSeconds + ' sec';
    }
    else {
        tempsEcoule = tempsEcoule + ' sec';
    }

    return tempsEcoule;
}

function finDuJeu() {// cette fonction a pour but de stopper le jeu quand l'objet rencontre un obstacle
    let tempsAffiche;

    if (testColision()) //Lorsque l'objet rencontre l'obstacle
    {
        tempsAffiche = 'Votre temps est ' + tempsEcoule; // On enregistre le temps ecoulé
        textSize(30);
        text(tempsAffiche,widthCanvas/4,heightCanvas/2); // On affiche le temps enregistre au millieu de l'ecran
        noLoop(); //une fonction qui coupe Draw() et donc mets fin au jeu
    }
}

function randomOne(){ //Cette fonction à pour but de donner de maniere random 1 ou -1
    let oddOrEven = (round(random()*100))%2; //le resultat est un random qui vaut soit 1 soit 0

    if (oddOrEven == 1)
    {
        return 1; 
    }
    else{
        return -1;
    }
}