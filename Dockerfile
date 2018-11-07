FROM julia
COPY . /app
RUN /usr/local/julia/bin/julia --project=app -e 'using Pkg; Pkg.instantiate(); Pkg.status()'
EXPOSE 8000
CMD /usr/local/julia/bin/julia --project=app /app/src/handler.jl
