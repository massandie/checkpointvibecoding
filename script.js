/* =============================================================
   SCRIPT.JS — Interactions en JavaScript Vanilla
   Portfolio de Massandie Koné
   ============================================================= */

// On attend que tout le HTML soit chargé avant de lancer le code
document.addEventListener("DOMContentLoaded", function () {

  // Vrai si l'utilisatrice a demandé moins d'animations dans son système
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------
     1. ANNÉE AUTOMATIQUE DANS LE PIED DE PAGE
     ----------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* -----------------------------------------------------------
     2. APPARITION PROGRESSIVE DU CONTENU
     Chaque élément ".reveal" apparaît l'un après l'autre.
     ----------------------------------------------------------- */
  const revealItems = document.querySelectorAll(".reveal");

  revealItems.forEach(function (item, index) {
    // 120 ms d'écart entre chaque élément
    setTimeout(function () {
      item.classList.add("is-visible");
    }, 150 + index * 120);
  });

  /* -----------------------------------------------------------
     3. BOUTON « VOIR MES PROJETS »
     - Si une section #projets existe : défilement fluide vers elle.
     - Sinon : petite notification élégante.
     ----------------------------------------------------------- */
  const projectsBtn = document.getElementById("projects-btn");
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  projectsBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const projectsSection = document.getElementById("projets");

    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      showToast("✨ Mes projets arrivent très bientôt, merci de votre patience !");
    }
  });

  /* -----------------------------------------------------------
     4. EFFET LUMINEUX QUI SUIT LA SOURIS SUR LE BOUTON
     On envoie la position de la souris au CSS (variables --x et --y).
     ----------------------------------------------------------- */
  projectsBtn.addEventListener("mousemove", function (event) {
    const rect = projectsBtn.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    projectsBtn.style.setProperty("--x", x + "px");
    projectsBtn.style.setProperty("--y", y + "px");

    // Effet « magnétique » léger : le bouton suit un peu la souris
    if (!reduceMotion) {
      const moveX = (x - rect.width / 2) * 0.15;
      const moveY = (y - rect.height / 2) * 0.25;
      projectsBtn.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
    }
  });

  projectsBtn.addEventListener("mouseleave", function () {
    projectsBtn.style.transform = "";
  });

  /* -----------------------------------------------------------
     5. ÉLÉMENTS DÉCORATIFS QUI BOUGENT AVEC LA SOURIS (parallaxe)
     Uniquement sur ordinateur (souris), pas sur mobile.
     ----------------------------------------------------------- */
  const hasMouse = window.matchMedia("(pointer: fine)").matches;
  const depthItems = document.querySelectorAll("[data-depth]");
  const codeCard = document.getElementById("code-card");

  if (hasMouse && !reduceMotion) {
    window.addEventListener("mousemove", function (event) {
      // Position de la souris entre -0.5 et 0.5 (0 = centre de l'écran)
      const ratioX = event.clientX / window.innerWidth - 0.5;
      const ratioY = event.clientY / window.innerHeight - 0.5;

      // Les halos et la pastille se déplacent selon leur "profondeur"
      depthItems.forEach(function (item) {
        const depth = Number(item.dataset.depth);
        item.style.transform =
          "translate(" + ratioX * depth + "px, " + ratioY * depth + "px)";
      });

      // La carte de code s'incline légèrement en 3D
      codeCard.style.transform =
        "perspective(1000px) rotateY(" + ratioX * 8 + "deg) rotateX(" + -ratioY * 8 + "deg)";
    });
  }
});
