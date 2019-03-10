using Test

include("cards.jl")

@testset "Core Functions Tests" begin
  @testset "search" begin
    df = DataFrame(english=["one", "two", "three"],
                   hebrew=["hebrew1","hebrew2","hebrew3"])
    searchTerm = "t"
    @test search(searchTerm, df) == DataFrame(english=["two", "three"],
                                              hebrew=["hebrew2", "hebrew3"])

    searchTerm = "hebrew"
    @test search(searchTerm, df) == DataFrame(english=["one", "two", "three"],
                                              hebrew=["hebrew1", "hebrew2", "hebrew3"])
    # TODO: test querying with actual hebrew characters, esp with nikkud
  end
end;
