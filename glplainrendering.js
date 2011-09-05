var glPlainRendering = {
    mQuadVBO: null,

    fragmentShaderCode: null,
    vertexShaderCode: null,
    shader: null,

    imageURL: null,
    texture: null,

    time: 0.0,

    init: function () {
        var vertices = new Float32Array([ -1.,-1., 1.,-1., -1.,1., 1.,-1., 1.,1., -1.,1.]);
        this.mQuadVBO = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mQuadVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        if (this.fragmentShaderCode && this.vertexShaderCode && !this.shader) {
            this.shader = this.createShader(this.fragmentShaderCode, this.vertexShaderCode);
        }

        if (this.imageURL && !this.texture) {
            this.texture = this.loadImageTexture(this.imageURL);
        }

        this.gl.useProgram(this.shader);
        this.gl.enable(this.gl.TEXTURE_2D);
        this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.shader, "position"));

    },

    animate: function () {
        this.time += 0.01;
    },

    render: function () {
        if (!this.gl || !this.shader || !this.texture) {
            throw "Error, missing property!";
        }

        var gl = this.gl;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mQuadVBO);

        gl.uniform2f(gl.getUniformLocation(this.shader, "resolution"), gl.viewportWidth, gl.viewportHeight);
        gl.uniform1f(gl.getUniformLocation(this.shader, "ratio"), 0.5+Math.sin(this.time)/2);

        gl.vertexAttribPointer(this.gl.getAttribLocation(this.shader, "position"), 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(gl.getUniformLocation(this.shader, "tex0"), 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
};