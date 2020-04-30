package beans;

public class Comment {
	private Guest guestCommentAuthor; //Gost koji je ostavio komentar
	private Apartment apartmentComment;  //Apartman na koji se odnosi komentar
	private String txtOfComment;
	private Integer ratingForApartment;
	
	public Guest getGuestCommentAuthor() {
		return guestCommentAuthor;
	}
	public void setGuestCommentAuthor(Guest guestCommentAuthor) {
		this.guestCommentAuthor = guestCommentAuthor;
	}
	public Apartment getApartmentComment() {
		return apartmentComment;
	}
	public void setApartmentComment(Apartment apartmentComment) {
		this.apartmentComment = apartmentComment;
	}
	public String getTxtOfComment() {
		return txtOfComment;
	}
	public void setTxtOfComment(String txtOfComment) {
		this.txtOfComment = txtOfComment;
	}
	public Integer getRatingForApartment() {
		return ratingForApartment;
	}
	public void setRatingForApartment(Integer ratingForApartment) {
		this.ratingForApartment = ratingForApartment;
	}
}
