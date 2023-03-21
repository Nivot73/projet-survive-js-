// Declaration et initialisation des variables

let widthCanvas = 640; //Largeur du plan de travail
let heightCanvas = 480; //Hauteur du plan de travail
let diametreObjet = 50; //diametre du joueur
let vitesseObjet = 5; //vitesse de deplacement du joueur
let diametreObstacle = 10; //diamètre des obstacles
let vitesseObstacle = 1; //vitesse de déplacement des obstacles
let obstaclesTableau = []; //création du tableau vide pour contenir les obstacles
let nombresObstacles = 10; //taille maximal du tableau et donc nombre max d'obstacle
// !!! attention: si ce nombre est atteint, le jeu bloque !!! C'est pourquoi le programme est conçu pour declarer la victoire lorsque celui-ci est atteind
let spawnKill = 2;//une variable qui retire les derniers obstacle spawner de la vérification.
//vous disposez de spawnKill secondes pour eviter un obstacle qui spawn avant de Game Over si vous le cogner.

//Fonction principale

function setup() {//Toute fonction dans"setup" ne sera invoqué que 1 fois
    createCanvas(widthCanvas,heightCanvas); //création de la zone de travail
    joueur = new Joueur();  //creation de l'objet joueur
    for(let i = 0; i < nombresObstacles; i++){ //remplissage du tableau d'obstacle que on utilisera.
        let positionX = random(0.1,0.9) * widthCanvas; //random est de 0.1 à 0.9 pour eviter le Spawn dans les murs.
        let positionY = random(0.1,0.9) * heightCanvas;
        obstacle = new Obstacle (positionX, positionY); //on créer un objet obstacle avec des donnée random
        obstaclesTableau.push(obstacle);    //on insere l'objet nouvellement créer dans le tableau pour le réutiliser plus tard.
    }
}

function draw() { //fonction qui tourne en boucle
    background('gray'); //couleur du plan de travail
    joueur.display();   //on affiche le joueur
    joueur.updatePositionCercle();  //on permet la modification de la position du joueur en utilisant les fleches
    for (let i = 0; i < round(millis()/1000); i++){ //round(millis()/1000) correspond au temps en seconde écoulé depuis le debut. On affiche donc que un certain nombre d'obstacle suivant le temps écoulé
        obstaclesTableau[i].display();//On affiche chaque élément du tableau qui a un indice compris entre 0 et le temps ecoulé
        obstaclesTableau[i].updatePositionObstacle();
    }
    calculerTempsEcoule();
    text(tempsEcoule,widthCanvas/2,heightCanvas - 30);//On affiche le temps ecoule
    finDuJeu(); //on verifie que il n'y a pas de contact entre l'objet et les obstacle
}

//Classe

class Joueur //la classe qui sert a controler l'objet
{
    _positionObjetX = widthCanvas/2; //position de départ de l'objet
    _positionObjetY = heightCanvas/2;
    _diametreObjet = diametreObjet;
    _vitesseObjet = vitesseObjet;

    constructor() {
    }

    display(){//on affiche l'objet
        fill('white'); //la couleur de l'objet
        circle(this._positionObjetX, this._positionObjetY, this._diametreObjet); 
    }

    updatePositionCercle(){//l'update de la position de l'objet par appui sur les touche directionnel
        if (keyIsDown(RIGHT_ARROW))
        {
            if (testOutOfScreen('Right',this._diametreObjet,this._positionObjetX,this._positionObjetY)) {
                this._positionObjetX = this._positionObjetX + this._vitesseObjet;
            }
        }
    
        if (keyIsDown(LEFT_ARROW))
        {
            if (testOutOfScreen('Left',this._diametreObjet,this._positionObjetX,this._positionObjetY)) {
                this._positionObjetX = this._positionObjetX - this._vitesseObjet;
            }
        }
    
        if (keyIsDown(DOWN_ARROW))
        {
            if (testOutOfScreen('Down',this._diametreObjet,this._positionObjetX,this._positionObjetY)) {
                this._positionObjetY = this._positionObjetY + this._vitesseObjet;
            }
        }
    
        if (keyIsDown(UP_ARROW))
        {
            if (testOutOfScreen('Up',this._diametreObjet,this._positionObjetX,this._positionObjetY)) {
                this._positionObjetY = this._positionObjetY - this._vitesseObjet;
            }
        }
    }   
}

class Obstacle { //la classe qui sert pour controler les obstacle

    _positionObstacleX;
    _positionObstacleY;
    _diametreObstacle = diametreObstacle;
    _sensObstacle = randomOne(); 
    _directionObstacle = randomOne();
    _vitesseObstacle = vitesseObstacle;


    constructor (positionX,positionY) {
        this._positionObstacleX = positionX;
        this._positionObstacleY = positionY;
    }

    display(){
        fill('red');//couleur des obstacle
        circle(this._positionObstacleX, this._positionObstacleY, this._diametreObstacle);    
    } 
    
    updatePositionObstacle() {//une fonction qui bouge l'obstacle automatiquement
        if(this._sensObstacle == 1)//Si l'obstacle bouge suivant l'axe X
        {
            this._positionObstacleX = this._positionObstacleX + this._directionObstacle * this._vitesseObstacle;
             
            if (!testOutOfScreen('Left',this._diametreObstacle,this._positionObstacleX,this._positionObstacleY) || !testOutOfScreen('Right',this._diametreObstacle,this._positionObstacleX,this._positionObstacleY))
            {
                this._directionObstacle = this._directionObstacle * (-1);
            }//si l'obstacle est au bord, on change son sens
        }
    
        if(this._sensObstacle == -1)//Si l'obstacle bouge suivant l'axe Y
        {
            this._positionObstacleY = this._positionObstacleY + this._directionObstacle * this._vitesseObstacle;
    
            if (!testOutOfScreen('Up',this._diametreObstacle,this._positionObstacleX,this._positionObstacleY) || !testOutOfScreen('Down',this._diametreObstacle,this._positionObstacleX,this._positionObstacleY))
            {
                this._directionObstacle = this._directionObstacle * (-1);
            }
        }
    }

    testColision() {//on test si il y a collision entre cette obstacle et le joueur
        if (dist(joueur._positionObjetX, joueur._positionObjetY, this._positionObstacleX, this._positionObstacleY) - (joueur._diametreObjet + this._diametreObstacle)/2 <= 0)
        { 
         return true;//on retourne si il y a contact ou non sous la forme d'un booléan
        }
        else { 
         return false;
        }
    }
}

//Fonction général

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

function calculerTempsEcoule() {// On mesure le temps ecoule depuis le lancement
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
    
    for (let i = 0; i < round(millis()/1000) - spawnKill; i++){//on va faire le test pour tout les obstacle affiché
        if (obstaclesTableau[i].testColision()) //Lorsque l'objet rencontre l'obstacle qui a l'indice i et donc declenche la mort
        {
            tempsAffiche = 'Votre temps est ' + tempsEcoule; // On enregistre le temps ecoulé
            textSize(30);
            text(tempsAffiche,widthCanvas/4,heightCanvas/2); // On affiche le temps enregistre au millieu de l'ecran
            noLoop(); //une fonction qui coupe Draw() et donc mets fin au jeu
        }
    }

    if (round(millis()/1000) == nombresObstacles)
    {
        textSize(30);
        text("Vous Avez Gagné",widthCanvas/4,heightCanvas/2);
        noLoop();
    }
}