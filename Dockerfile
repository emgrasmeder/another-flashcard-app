FROM julia
COPY . /app
RUN /usr/local/julia/bin/julia --project=myapp -e 'using Pkg; Pkg.instantiate(); Pkg.status()'
CMD /usr/local/julia/bin/julia --project=myapp /app/helloworld.jl
