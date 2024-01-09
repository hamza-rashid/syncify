from rest_framework import serializers
from .models import Room

class UniqueCodeValidator:
    def __call__(self, value):
        queryset = Room.objects.filter(code=value)
        if queryset.exists():
            raise serializers.ValidationError("Room with this code already exists.")

class RoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[UniqueCodeValidator()])
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room 
        fields = ('guest_can_pause', 'votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')
