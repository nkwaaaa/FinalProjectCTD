package com.example.piBack.Model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;
    @Column
    private String URL;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name="ID_product")
    @JsonBackReference(value = "product-image")
    private Product product;

    public Image() {
    }

    public Image(String title, String URL, Product product) {
        this.title = title;
        this.URL = URL;
        this.product = product;
    }
}
