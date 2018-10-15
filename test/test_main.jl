# take a look at: http://abelsiqueira.github.io/blog/test-driven-development-in-julia/
using Test
include("../src/functions.jl")
@test 1 == one()
