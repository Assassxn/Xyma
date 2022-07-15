math = require('mathjs');

function processPoints(points) {
    // sort array by x values
    points.sort(function (a, b) {
        if (a.x < b.x) return -1;
        if (a.x === b.x) return 0;
        return 1;
    });

    for (var i = 0; i < points.length; i++) {
        if (i < points.length - 1 && points[i].x === points[i + 1].x) {
            // two points have the same x-value

            // check if the y-value is the same
            if (points[i].y === points[i + 1].y) {
                // remove the latter
                points.splice(i, 1);
                i--;
            } else {
                throw Error("SameXDifferentY");
            }
        }
    }

    if (points.length < 2) {
        throw Error("NotEnoughPoints");
    }

    for (var i = points.length - 1; i >= 0; i--) {
        points[i].x = parseFloat(points[i].x);
        points[i].y = parseFloat(points[i].y);
    }

    return points;
}

function getMinMax(points) {
    // determine max and min x and y values
    minX = points[0].x;
    maxX = points[0].x;
    minY = points[0].y;
    maxY = points[0].y;

    for (var i = 1; i < points.length; i++) {
        minX = Math.min(minX, points[i].x);
        maxX = Math.max(maxX, points[i].x);
        minY = Math.min(minY, points[i].y);
        maxY = Math.max(maxY, points[i].y);
    }

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
    };
}

// Cubic spline interpolation
// The function uses the library math.js to ensure high precision results.
// @param p The points. An array of objects with x and y coordinate.
// @param type The interpolation boundary condition ("quadratic", "notaknot", "periodic", "natural"). "natural" is the default value.
function cubicSplineInterpolation(p, boundary) {
    var row = 0;
    var solutionIndex = (p.length - 1) * 4;

    // initialize matrix
    var m = []; // rows
    for (var i = 0; i < (p.length - 1) * 4; i++) {
        // columns (rows + 1)
        m.push([]);
        for (var j = 0; j <= (p.length - 1) * 4; j++) {
            m[i].push(math.bignumber(0)); // fill with zeros
        }
    }

    // splines through p equations
    for (var functionNr = 0; functionNr < p.length - 1; functionNr++, row++) {
        var p0 = p[functionNr],
            p1 = p[functionNr + 1];
        m[row][functionNr * 4 + 0] = math.pow(math.bignumber(p0.x), 3);
        m[row][functionNr * 4 + 1] = math.pow(math.bignumber(p0.x), 2);
        m[row][functionNr * 4 + 2] = math.bignumber(p0.x);
        m[row][functionNr * 4 + 3] = math.bignumber(1);
        m[row][solutionIndex] = math.bignumber(p0.y);

        m[++row][functionNr * 4 + 0] = math.pow(math.bignumber(p1.x), 3);
        m[row][functionNr * 4 + 1] = math.pow(math.bignumber(p1.x), 2);
        m[row][functionNr * 4 + 2] = math.bignumber(p1.x);
        m[row][functionNr * 4 + 3] = math.bignumber(1);
        m[row][solutionIndex] = math.bignumber(p1.y);
    }

    // first derivative
    for (var functionNr = 0; functionNr < p.length - 2; functionNr++, row++) {
        var p1 = p[functionNr + 1];
        m[row][functionNr * 4 + 0] = math.multiply(3, math.pow(math.bignumber(p1.x), 2));
        m[row][functionNr * 4 + 1] = math.multiply(2, math.bignumber(p1.x));
        m[row][functionNr * 4 + 2] = math.bignumber(1);
        m[row][functionNr * 4 + 4] = math.multiply(-3, math.pow(math.bignumber(p1.x), 2));
        m[row][functionNr * 4 + 5] = math.multiply(-2, math.bignumber(p1.x));
        m[row][functionNr * 4 + 6] = math.bignumber(-1);
    }

    // second derivative
    for (var functionNr = 0; functionNr < p.length - 2; functionNr++, row++) {
        var p1 = p[functionNr + 1];
        m[row][functionNr * 4 + 0] = math.multiply(6, math.bignumber(p1.x));
        m[row][functionNr * 4 + 1] = math.bignumber(2);
        m[row][functionNr * 4 + 4] = math.multiply(-6, math.bignumber(p1.x));
        m[row][functionNr * 4 + 5] = math.bignumber(-2);
    }

    // boundary conditions
    switch (boundary) {
        case "quadratic": // first and last spline quadratic
            m[row++][0] = math.bignumber(1);
            m[row++][solutionIndex - 4 + 0] = math.bignumber(1);
            break;

        case "notaknot": // Not-a-knot spline
            m[row][0 + 0] = math.bignumber(1);
            m[row++][0 + 4] = math.bignumber(-1);
            m[row][solutionIndex - 8 + 0] = math.bignumber(1);
            m[row][solutionIndex - 4 + 0] = math.bignumber(-1);
            break;

        case "periodic": // periodic function
            // first derivative of first and last point equal
            m[row][0] = math.multiply(3, math.pow(math.bignumber(p[0].x), 2));
            m[row][1] = math.multiply(2, math.bignumber(p[0].x));
            m[row][2] = math.bignumber(1);
            m[row][solutionIndex - 4 + 0] = math.multiply(-3, math.pow(math.bignumber(p[p.length - 1].x), 2));
            m[row][solutionIndex - 4 + 1] = math.multiply(-2, math.bignumber(p[p.length - 1].x));
            m[row++][solutionIndex - 4 + 2] = math.bignumber(-1);

            // second derivative of first and last point equal
            m[row][0] = math.multiply(6, math.bignumber(p[0].x));
            m[row][1] = math.bignumber(2);
            m[row][solutionIndex - 4 + 0] = math.multiply(-6, math.bignumber(p[p.length - 1].x));
            m[row][solutionIndex - 4 + 1] = math.bignumber(-2);
            break;

        default:
            // natural spline
            m[row][0 + 0] = math.multiply(6, p[0].x);
            m[row++][0 + 1] = math.bignumber(2);
            m[row][solutionIndex - 4 + 0] = math.multiply(6, math.bignumber(p[p.length - 1].x));
            m[row][solutionIndex - 4 + 1] = math.bignumber(2);
            break;
    }

    var reducedRowEchelonForm = rref(m);
    var coefficients = [];
    for (var i = 0; i < reducedRowEchelonForm.length; i++) {
        coefficients.push(reducedRowEchelonForm[i][reducedRowEchelonForm[i].length - 1]);
    }

    var functions = [];
    for (var i = 0; i < coefficients.length; i += 4) {
        functions.push({
            a: parseFloat(coefficients[i]),
            b: parseFloat(coefficients[i + 1]),
            c: parseFloat(coefficients[i + 2]),
            d: parseFloat(coefficients[i + 3]),
            range: { xmin: parseFloat(p[i / 4].x), xmax: parseFloat(p[i / 4 + 1].x) },
        });
    }
    return functions;
}

// Reduced row echelon form
// Taken from https://rosettacode.org/wiki/Reduced_row_echelon_form
// Modified to work with math.js (high float precision).
function rref(mat) {
    var lead = 0;
    for (var r = 0; r < mat.length; r++) {
        if (mat[0].length <= lead) {
            return;
        }
        var i = r;
        while (mat[i][lead] == 0) {
            i++;
            if (mat.length == i) {
                i = r;
                lead++;
                if (mat[0].length == lead) {
                    return;
                }
            }
        }

        var tmp = mat[i];
        mat[i] = mat[r];
        mat[r] = tmp;

        var val = mat[r][lead];
        for (var j = 0; j < mat[0].length; j++) {
            mat[r][j] = math.divide(mat[r][j], val);
        }

        for (var i = 0; i < mat.length; i++) {
            if (i == r) continue;
            val = math.bignumber(mat[i][lead]);
            for (var j = 0; j < mat[0].length; j++) {
                mat[i][j] = math.subtract(math.bignumber(mat[i][j]), math.multiply(val, math.bignumber(mat[r][j])));
            }
        }
        lead++;
    }
    return mat;
}


function CubicSolve(a, b, c, d) {
    b /= a;
    c /= a;
    d /= a;

    var discrim, q, r, dum1, s, t, term1, r13;

    q = (3.0 * c - b * b) / 9.0;
    r = -(27.0 * d) + b * (9.0 * c - 2.0 * (b * b));
    r /= 54.0;

    discrim = q * q * q + r * r;

    var roots = [
        { real: 0, i: 0 },
        { real: 0, i: 0 },
        { real: 0, i: 0 },
    ];

    term1 = b / 3.0;

    if (discrim > 0) {
        // one root real, two are complex
        s = r + Math.sqrt(discrim);
        s = s < 0 ? -Math.pow(-s, 1.0 / 3.0) : Math.pow(s, 1.0 / 3.0);
        t = r - Math.sqrt(discrim);
        t = t < 0 ? -Math.pow(-t, 1.0 / 3.0) : Math.pow(t, 1.0 / 3.0);

        roots[0].real = -term1 + s + t;
        term1 += (s + t) / 2.0;
        roots[2].real = roots[2].real = -term1;
        term1 = (Math.sqrt(3.0) * (-t + s)) / 2;

        roots[1].i = term1;
        roots[2].i = -term1;
        return roots;
    } // End if (discrim > 0)

    // The remaining options are all real

    if (discrim == 0) {
        // All roots real, at least two are equal.
        r13 = r < 0 ? -Math.pow(-r, 1.0 / 3.0) : Math.pow(r, 1.0 / 3.0);
        roots[0].real = -term1 + 2.0 * r13;
        roots[2].real = roots[1].real = -(r13 + term1);
        return roots;
    } // End if (discrim == 0)

    // Only option left is that all roots are real and unequal (to get here, q < 0)
    q = -q;
    dum1 = q * q * q;
    dum1 = Math.acos(r / Math.sqrt(dum1));
    r13 = 2.0 * Math.sqrt(q);

    roots[0].real = -term1 + r13 * Math.cos(dum1 / 3.0);
    roots[1].real = -term1 + r13 * Math.cos((dum1 + 2.0 * Math.PI) / 3.0);
    roots[2].real = -term1 + r13 * Math.cos((dum1 + 4.0 * Math.PI) / 3.0);

    return roots;
} 

module.exports = {
    cubicSplineInterpolation,
    CubicSolve,
}