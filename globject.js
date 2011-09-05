var glObject = {

    gl: null,
    container: null,
    stats: null,

    run: function () {
        if ( ! Detector.webgl ) { Detector.addGetWebGLMessage(); }
        this.init();
        this.animate();
    },
    
    init: function () {

        this.container = document.getElementById( 'container' );

        this.initGL(this.container);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';
        this.container.appendChild( this.stats.domElement );

        this.onWindowResize();
        window.addEventListener( 'resize', _.bind(this.onWindowResize, this), false );
    },

    initGL: function (canvas) {
        var gl;
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
            drawingMode = gl.TRIANGLES;
        } catch(e) { console.log(e); }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
        this.gl = gl;
    },

    onWindowResize: function ( event ) { },

    animate: function () {
        this.preRender();
        this.render();
        this.postRender();
    },

    preRender: function () {
        window.requestAnimationFrame( _.bind(this.animate, this) );
    },
    render: function () { },
    postRender: function () {
        this.stats.update();
    }
};